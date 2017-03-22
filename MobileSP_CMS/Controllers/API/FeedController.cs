using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Jil;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using MLearningCoreService;
using MobileSP_CMS.Core.Enumerations;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Infrastructure.Repositories;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace MobileSP_CMS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class FeedController : BaseController
    {
        public FeedController(IMemoryCache memoryCache) : base(memoryCache){}

        [HttpGet("[action]")]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetFeedItems()
        {
            var cachedFeed = await _cache.GetOrCreateAsync("FeedCache", entry =>
            {
                var feedRepo = GetRespository<IFeedRepository>();
                return feedRepo.GetFeedItemsAsync();
            });
            return Json(cachedFeed);
        }

        [HttpGet("[action]")]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetFeedItem(int id) 
        {
            var feedRepo = GetRespository<IFeedRepository>();
            var feedItem = await feedRepo.GetFeedItemAsync(id);
            return Json(feedItem);
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> CreateFeedItem<TFeedItem, TDestinationDto>(dynamic feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var feedRepo = GetRespository<IFeedRepository>();
            var feedItemResponse = await feedRepo.CreateFeedItemAsync<TFeedItem, TDestinationDto>(feedItem);
            return Json(feedItemResponse);
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateFeedItem<TFeedItem,TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            _cache.Remove("FeedCache");
            if (feedItem.Id == 0)
                return await CreateFeedItem<TFeedItem, TDestinationDto>(feedItem);

            var feedRepo = GetRespository<IFeedRepository>();
            var feedItemResponse = await feedRepo.UpdateFeedItemAsync<TFeedItem, TDestinationDto>(feedItem);
            return Json(feedItemResponse);
        }


        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateTextFeedItem([FromBody]TextFeed feedItem) => await UpdateFeedItem<TextFeed, TextFeedDto>(feedItem);

        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateImageFeedItem([FromBody]ImageFeed feedItem) => await UpdateFeedItem<ImageFeed, ImageFeedDto>(feedItem);

        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateVideoFeedItem([FromBody]VideoFeed feedItem) => await UpdateFeedItem<VideoFeed, VideoFeedDto>(feedItem);

    }
}

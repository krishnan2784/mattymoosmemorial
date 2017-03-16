using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Jil;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MLearningCoreService;
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
        [HttpGet("[action]")]
        public async Task<JsonResult> GetFeedItems()
        {
            var feedRepo = GetRespository<IFeedRepository>();
            var feedItems = await feedRepo.GetFeedItemsAsync();
            return Json(feedItems);
        }

        [HttpGet("[action]")]
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
            if (feedItem.Id == 0)
                return await CreateFeedItem<TFeedItem, TDestinationDto>(feedItem);

            var feedRepo = GetRespository<IFeedRepository>();
            var feedItemResponse = await feedRepo.UpdateFeedItemAsync<TFeedItem, TDestinationDto>(feedItem);
            return Json(feedItemResponse);
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateTextFeedItem([FromBody]TextFeed feedItem)
        {
            var request = Request;
            return await UpdateFeedItem<TextFeed,TextFeedDto>(feedItem);
        }

    }
}

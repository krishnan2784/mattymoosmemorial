using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using MLearningCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Helpers.Attributes;
using MobileSP_CMS.Infrastructure;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;
using Newtonsoft.Json;

namespace MobileSP_CMS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class FeedController : MarketController
    {
        private readonly IFeedRepository _feedRepository;

        public FeedController(IMemoryCache memoryCache, IFeedRepository feedRepository, IUserRepository userRepository) : base(memoryCache, userRepository)
        {
            _feedRepository = feedRepository;
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetFeedItems()
        {
            var cachedFeed = await _cache.GetOrCreateAsync(CacheKeys.FEEDITEMS, entry => _feedRepository.GetFeedItemsAsync());
            return Json(cachedFeed);
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetFeedItem(int id) 
        {
            var feedItem = await _feedRepository.GetFeedItemAsync(id);
            return Json(feedItem);
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> CreateFeedItem<TFeedItem, TDestinationDto>(dynamic feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            feedItem.MarketId = CurrentMarketId;
            var feedItemResponse = await _feedRepository.CreateFeedItemAsync<TFeedItem, TDestinationDto>(feedItem);
            return Json(feedItemResponse);
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateFeedItem<TFeedItem,TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            if (feedItem.Id == 0)
                return await CreateFeedItem<TFeedItem, TDestinationDto>(feedItem);
            
            var feedItemResponse = await _feedRepository.UpdateFeedItemAsync<TFeedItem, TDestinationDto>(feedItem);
            return Json(feedItemResponse);
        }


        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> UpdateTextFeedItem([FromBody] dynamic feedItem)
        {
            try
            {
                var fo = JsonConvert.DeserializeObject(feedItem);
                var fee = FeedMapper.MapFeedItem<dynamic, TextFeed>(fo);
                return await UpdateFeedItem<TextFeed, TextFeedDto>(fee);

            }
            catch (Exception e)
            {
                
            }
            return null;
        }

        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> UpdateImageFeedItem([FromBody]ImageFeed feedItem) => await UpdateFeedItem<ImageFeed, ImageFeedDto>(feedItem);

        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> UpdateVideoFeedItem([FromBody]VideoFeed feedItem) => await UpdateFeedItem<VideoFeed, VideoFeedDto>(feedItem);

        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> UpdateQuizFeedItem([FromBody]QuizFeed feedItem) => await UpdateFeedItem<QuizFeed, QuizFeedDto>(feedItem);
        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> UpdateSurveyFeedItem([FromBody]SurveyFeed feedItem) => await UpdateFeedItem<SurveyFeed, SurveyFeedDto>(feedItem);

    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using MLearningCoreService;
using Newtonsoft.Json;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Controllers.API
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class FeedController : MarketController
    {
        private readonly IFeedRepository _feedRepository;

        public FeedController(IMemoryCache memoryCache, IFeedRepository feedRepository, IUserRepository userRepository, IMarketRepository marketRepository,
            IUserConfigurationRepository userConfigRepository, IMarketUserRepository marketUserRepository,
            IContentRepository contentRepository) 
            : base(memoryCache, userRepository, marketRepository, userConfigRepository, marketUserRepository, contentRepository)
        {
            _feedRepository = feedRepository;
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetFeedItems()
        {
            var cachedFeed = await _cache.GetOrCreateAsync(CacheKeys.FEEDITEMS, entry => _feedRepository.GetMarketFeedItems(CurrentMarketId));
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
            var success = feedItemResponse != null;
            return Json(new BaseResponse<TFeedItem>(success, success ? "Feed item successfuly created" : "Failed to create feed item", feedItemResponse));
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateFeedItem<TFeedItem,TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            feedItem.EndDate = feedItem.EndDate?.AddDays(1).AddSeconds(-1);
            if (feedItem.Id == 0)
                return await CreateFeedItem<TFeedItem, TDestinationDto>(feedItem);
            
            var feedItemResponse = await _feedRepository.UpdateFeedItemAsync<TFeedItem, TDestinationDto>(feedItem);
            var success = feedItemResponse?.Id > 0;
            return Json(new BaseResponse<TFeedItem>(success, success ? "Feed item successfuly updated" : "Failed to update feed item", feedItemResponse));
        }

        
        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> UpdateTextFeedItem([FromBody]TextFeed feedItem) => await UpdateFeedItem<TextFeed, TextFeedDto>(feedItem);


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

        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> UpdateObservationFeedItem([FromBody]ObservationFeed feedItem) => await UpdateFeedItem<ObservationFeed, ObservationFeedDto>(feedItem);



        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> DeleteFeedItem([FromBody]int feedItemId)
        {
            var feedItemResponse = await _feedRepository.DeleteFeedItemAsync(feedItemId);
            return Json(new BaseResponse<bool>(feedItemResponse, feedItemResponse ? "Feed item successfuly deleted" : "Failed to delete feed item", feedItemResponse));
        }
        
        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> CopyFeedItemToMarket(int id, List<int> marketIds)
        {
            var feedItemResponse = await _feedRepository.CopyFeedItemToMarketAsync(id, marketIds);
            return Json(new BaseResponse<bool>(feedItemResponse, feedItemResponse ? "Feed item successfuly copied" : "Failed to copy feed item", feedItemResponse));
        }

        //[JsonResponseWrapper]
        //public async Task<JsonResult> UpdateTextFeedItem([FromBody] JToken feedItem)
        //{
        //    try
        //    {
        //        return await UpdateFeedItem<TextFeed, TextFeedDto>(feedItem.ToObject<TextFeed>());

        //    }
        //    catch (Exception e)
        //    {

        //    }
        //    return null;
        //}
    }
}

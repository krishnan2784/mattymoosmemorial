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
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Helpers;
using Phm.MobileSp.Cms.Helpers.CustomModelBinding;
using Phm.MobileSp.Cms.Helpers.CustomModelBinding.FeedItems;

namespace Phm.MobileSp.Cms.Controllers.API
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class FeedController : MarketContentController
    {
        private readonly IFeedRepository _feedRepository;

        public FeedController(IMemoryCache memoryCache, IFeedRepository feedRepository, IMarketRepository marketRepository,
            IUserConfigurationRepository userConfigRepository, IMarketUserRepository marketUserRepository) 
            : base(memoryCache, marketRepository, userConfigRepository, marketUserRepository, feedRepository)
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
        [JsonResponseWrapper]
        public async Task<JsonResult> CreateFeedItem<TFeedItem>(dynamic feedItem) where TFeedItem : BaseFeed {
            feedItem.MarketId = CurrentMarketId;
          
            var feedItemResponse = await _feedRepository.CreateFeedItemAsync<TFeedItem>(feedItem);
            var success = feedItemResponse?.Id > 0;
            return Json(new BaseResponse<TFeedItem>(success, success ? "Feed item successfuly created" : "Failed to create feed item", feedItemResponse));
        }

        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> UpdateFeedItem([FromBody][ModelBinder(BinderType = typeof(BaseFeedItemModelBinder))]BaseFeed feedItem)
        {
            feedItem.EndDate = feedItem.EndDate?.AddDays(1).AddSeconds(-1);
            if (feedItem.Id == 0)
                return await CreateFeedItem<BaseFeed>(feedItem);
            
            var feedItemResponse = await _feedRepository.UpdateFeedItemAsync(feedItem);
            var success = feedItemResponse?.Id > 0;
            return Json(new BaseResponse<BaseFeed>(success, success ? "Feed item successfuly updated" : "Failed to update feed item", feedItemResponse));
        }

        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> DeleteFeedItem([FromBody]int feedItemId)
        {
            var feedItemResponse = await _feedRepository.DeleteFeedItemAsync(feedItemId);
            return Json(new BaseResponse<bool>(feedItemResponse, feedItemResponse ? "Feed item successfuly deleted" : "Failed to delete feed item", feedItemResponse));
        }

	    [HttpGet("[action]")]
	    [JsonResponseWrapper]
	    [ResponseCache(CacheProfileName = "NoCache")]
	    public async Task<JsonResult> GetMarketsByMasterId(string contentId)
	    {
		    return await GetContentMarketsByMasterId(CopiedElementTypeEnum.Feed, contentId);
	    }

	    [HttpPost("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> CopyFeedItemToMarket(int id, List<int> marketIds)
	    {
		    var response = await _feedRepository.CopyFeedItemToMarketAsync(id, marketIds);
		    return Json(new BaseResponse<bool>(response, response ? "Feed item copied sucessfully" : "Feed item could not be copied", response));
	    }
	}
}

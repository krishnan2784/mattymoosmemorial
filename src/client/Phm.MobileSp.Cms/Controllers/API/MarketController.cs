﻿using System;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories;
using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class MarketController : BaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMarketRepository _marketRepository;
        private readonly IMarketUserRepository _marketUserRepository;
        private readonly IUserConfigurationRepository _userConfigRepository;
        private readonly IContentRepository _contentRepository;

        public MarketController(IMemoryCache memoryCache, IUserRepository userRepository, IMarketRepository marketRepository,
            IUserConfigurationRepository userConfigRepository, IMarketUserRepository marketUserRepository,
            IContentRepository contentRepository) : base(memoryCache)
        {
            _userRepository = userRepository;
            _marketRepository = marketRepository;
            _userConfigRepository = userConfigRepository;
            _marketUserRepository = marketUserRepository;
            _contentRepository = contentRepository;
        }
        
        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> ChangeMarket(int marketId)
        {
            var configs = await _userConfigRepository.GetUserConfigurationsByUserId(UserId);
            var isUserMarket = configs.FirstOrDefault(x => x.MarketId == marketId);

            if (isUserMarket == null || isUserMarket.MarketId == 0)
            {
                var markets = await _marketRepository.GetMarketsAsync();
                var isLiveMarket = markets.FirstOrDefault(x => (bool)x.IsLive && x.Id == marketId);
                if (isLiveMarket != null && isLiveMarket.Id > 0)
                {
                    var baseMarket = markets.FirstOrDefault(x => !(bool)x.IsLive
                    && x.MasterId == isLiveMarket.MasterId);

                    if (baseMarket != null && configs.Where(x => x.MarketId == baseMarket.Id).Count() > 0)
                        goto ValidMarket;
                }
                return new JsonResult(false);
            }

            ValidMarket:
            ClearMarketCache();
            CurrentMarketId = marketId;
            return new JsonResult(true);
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public JsonResult GetCurrentMarketId()
        {
            return Json(CurrentMarketId);
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<Market> GetCurrentMarket()
        {
            var markets = await _marketRepository.GetMarketsAsync();
            return markets.FirstOrDefault(x => x.Id == CurrentMarketId);
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetMarketsByMasterId(CopiedElementTypeEnum contentType, string masterId)
        {
            Guid master = new Guid(masterId);
            var markets = await _marketRepository.GetMarketsByMasterIdAsync(contentType, master);
            return Json(new BaseResponse<IEnumerable<Market>>(markets));
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetMarketUserFilters()
        {
            var marketFilters = await _marketUserRepository.GetMarketUserFilters(CurrentMarketId);
            return Json(new BaseResponse<dynamic>(marketFilters));
        }


        [HttpPost("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> PublishContentToLive(CopiedElementTypeEnum contentType, int contentId)
        {
            var result = await _contentRepository.PublishContentToLive(contentType, contentId);
            return Json(result);
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);
            if (context.HttpContext.Request.Method == "POST" && context.Exception == null)
            {
                ClearMarketCache();
            }
        }

        public void ClearMarketCache()
        {
            _cache.Remove(CacheKeys.FEEDITEMS);
        }
    }
}
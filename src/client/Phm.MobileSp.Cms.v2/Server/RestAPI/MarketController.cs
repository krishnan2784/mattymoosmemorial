using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Server.Controllers;

namespace Phm.MobileSp.Cms.Server.RestAPI
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class MarketController : BaseController
    {
        private readonly IMarketRepository _marketRepository;
        private readonly IMarketUserRepository _marketUserRepository;
        private readonly IUserConfigurationRepository _userConfigRepository;

        public MarketController(IMemoryCache memoryCache, IMarketRepository marketRepository,
            IUserConfigurationRepository userConfigRepository, IMarketUserRepository marketUserRepository) : base(memoryCache)
        {
            _marketRepository = marketRepository;
            _userConfigRepository = userConfigRepository;
            _marketUserRepository = marketUserRepository;
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
        public async Task<JsonResult> GetMarketUserFilters()
        {
            var marketFilters = await _marketUserRepository.GetMarketUserFilters(CurrentMarketId);
            return Json(new BaseResponse<dynamic>(marketFilters));
        }

	    [HttpGet("[action]")]
	    [JsonResponseWrapper]
	    [ResponseCache(CacheProfileName = "NoCache")]
	    public async Task<JsonResult> GetContentMarketsByMasterId(CopiedElementTypeEnum contentType, string masterId)
	    {
		    Guid master = new Guid(masterId);
		    var markets = await _marketRepository.GetMarketsByMasterIdAsync(contentType, master);
		    return Json(new BaseResponse<IEnumerable<Market>>(markets));
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

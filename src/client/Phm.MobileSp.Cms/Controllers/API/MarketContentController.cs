﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public abstract class MarketContentController : MarketController
	{
        private readonly IMarketContentRepository _marketContentRepository;

		protected MarketContentController(IMemoryCache memoryCache, IMarketRepository marketRepository,
	        IUserConfigurationRepository userConfigRepository, IMarketUserRepository marketUserRepository, IMarketContentRepository marketContentRepository) 
	        : base(memoryCache, marketRepository, userConfigRepository, marketUserRepository)
        {
            _marketContentRepository = marketContentRepository;
        }

		[HttpGet("[action]")]
		[JsonResponseWrapper]
		[ResponseCache(CacheProfileName = "NoCache")]
		public async Task<JsonResult> GetMarketsById(int contentId)
		{
			var markets = await _marketContentRepository.GetMarketsById(contentId);
			return Json(new BaseResponse<IEnumerable<Market>>(markets));
		}

		[HttpPost("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> PublishContentToLive(int contentId)
        {
            var result = await _marketContentRepository.PublishContentToLive(contentId);
            return Json(result);
        }

	    [HttpPost("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> CopyToMarket(int id, List<int> marketIds)
	    {
		    var response = await _marketContentRepository.CopyToMarket(id, marketIds);
		    return Json(response);
	    }
    }
}

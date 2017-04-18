using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class MarketController : BaseController
    {
        private readonly IUserRepository _userRepository;

        public MarketController(IMemoryCache memoryCache, IUserRepository userRepository) : base(memoryCache)
        {
            _userRepository = userRepository;
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> ChangeMarket(int marketId)
        {
            var configs = await _userRepository.GetUserConfigurationsByUserId(UserId);

            if (configs.FirstOrDefault(x => x.MarketId == marketId).MarketId > 0)
            {
                ClearMarketCache();
                CurrentMarketId = marketId;
                _userRepository.SetMarketId(marketId);
                return new JsonResult(true);
            }
            return new JsonResult(false);
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public JsonResult GetCurrentMarket()
        {
            return Json(CurrentMarketId);
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

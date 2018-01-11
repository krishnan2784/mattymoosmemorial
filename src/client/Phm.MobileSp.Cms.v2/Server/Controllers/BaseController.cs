using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers;
using Phm.MobileSp.Cms.Helpers.Attributes;

namespace Phm.MobileSp.Cms.Server.Controllers
{
    [Authorize]
    [AiHandleError]
    public class BaseController : CacheController
    {
        public BaseController(IMemoryCache memoryCache) :base(memoryCache){}

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public JsonResult GetAuthToken()
        {
            return Json(new BaseResponse<string>(AuthToken));
        }

        public string AuthToken => HttpContext.GetClaimValue<string>("sessionguid");

	      public string UserName => HttpContext.GetClaimValue<string>("name");

        public int CurrentMarketId
        {
            get => HttpContext.GetClaimValue<int>("currentmarketid");
            set => HttpContext.AddUpdateClaim("currentmarketid", value.ToString());
        }

        public int UserId => HttpContext.GetClaimValue<int>("userid");
        public int CurrentUserSecEntityId => HttpContext.GetClaimValue<int>("secentityid");
	}
}

using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net.Http;
using System.Net;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories;

namespace Phm.MobileSp.Cms.Controllers
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

        public string AuthToken
        {
            get
            {
				return HttpContext?.User.Claims.FirstOrDefault(x => x.Type == "sessionguid").Value;
            }
        }

        public string UserName
        {
            get {
				return HttpContext?.User.Claims.FirstOrDefault(x => x.Type == "name").Value;
            }
        }

        public int CurrentMarketId
        {
            get
            {
                return Convert.ToInt16(HttpContext?.User.Claims.FirstOrDefault(x => x.Type == "currentmarketid").Value);
            }
            set
            {
                var identity = new ClaimsIdentity(User.Identity);
                identity.RemoveClaim(identity.FindFirst("currentmarketid"));
                identity.AddClaim(new Claim("currentmarketid", value.ToString()));
            }
        }

        public int UserId
        {
            get
            {
                return Convert.ToInt16(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userid").Value);
            }
        }
    }
}

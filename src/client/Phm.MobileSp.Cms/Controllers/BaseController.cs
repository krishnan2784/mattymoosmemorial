using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Helpers.Attributes;

namespace Phm.MobileSp.Cms.Controllers
{
    [Authorize]
    [AiHandleError]
    public class BaseController : CacheController
    {
        private static string _AuthToken { get; set; }
        private static string _UserName { get; set; }
        private static int _CurrentMarketId { get; set; }
        private static int _UserId { get; set; }

        public BaseController(IMemoryCache memoryCache) :base(memoryCache){}


        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync("MobileSPAuthCookie");
            ClearCache();
            ClearRepoValues();
            return Redirect("/");
        }

        public void ClearRepoValues()
        {
            _AuthToken = string.Empty;
            _UserName = string.Empty;
            _CurrentMarketId = 0;
            _UserId = 0;
        }

        public string AuthToken
        {
            get
            {
                if (string.IsNullOrEmpty(_AuthToken))
                {
                    _AuthToken = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "sessionguid").Value;
                }
                return _AuthToken;
            }
        }

        public string UserName
        {
            get {
                if (string.IsNullOrEmpty(_UserName))
                {
                    _UserName = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "name").Value;
                }
                return _UserName;
            }
        }

        public int CurrentMarketId
        {
            get
            {
                if (_CurrentMarketId == 0)
                {
                    _CurrentMarketId = Convert.ToInt16(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "currentmarketid").Value);
                }
                return _CurrentMarketId;
            }
            set
            {
                var identity = new ClaimsIdentity(User.Identity);
                identity.RemoveClaim(identity.FindFirst("currentmarketid"));
                identity.AddClaim(new Claim("currentmarketid", value.ToString()));
                _CurrentMarketId = value;
            }
        }

        public int UserId
        {
            get
            {
                if (_UserId == 0)
                {
                    _UserId = Convert.ToInt16(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userid").Value);
                }
                return _UserId;
            }
        }
    }
}

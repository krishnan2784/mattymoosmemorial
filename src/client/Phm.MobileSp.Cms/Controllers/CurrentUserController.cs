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
    public class CurrentUserController : BaseController
    {
        private static string _AuthToken { get; set; }
        private static string _UserName { get; set; }
        private static int _CurrentMarketId { get; set; }
        private static int _UserId { get; set; }
        
        public CurrentUserController(IMemoryCache memoryCache) :base(memoryCache){}

	    [AiHandleError]
		[HttpGet]
		public async Task<IActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync("MobileSPAuthCookie");
            ClearCache();
            ClearRepoValues();
	        return View("/Views/Account/Logout.cshtml");
        }

        public void ClearRepoValues()
        {
            _AuthToken = string.Empty;
            _UserName = string.Empty;
            _CurrentMarketId = 0;
            _UserId = 0;
        }
    }
}

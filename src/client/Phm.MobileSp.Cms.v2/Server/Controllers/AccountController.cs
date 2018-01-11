using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Server.Controllers
{
    [AiHandleError]
    public class AccountController : CacheController
    {
        /// <summary>
        ///     The user repository.
        /// </summary>
        private readonly IUserRepository _userRepository;

        /// <summary>
        ///     Initializes a new instance of the <see cref="AccountController" /> class.
        /// </summary>
        /// <param name="memoryCache">
        ///     The memory cache.
        /// </param>
        /// <param name="userRepository">
        ///     The user repository.
        /// </param>
        public AccountController(IMemoryCache memoryCache, IUserRepository userRepository) : base(memoryCache)
        {
            _userRepository = userRepository;
        }

        [AiHandleError]
        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            if (User.Identity.IsAuthenticated)
                RedirectToAction("Index", "Home");

            var loginDetails = CookieHelper.GetLoginDetails(HttpContext);
            Console.WriteLine(JsonConvert.SerializeObject(loginDetails));
            return View(loginDetails);
        }

        [AiHandleError]
        [HttpPost]
        public async Task<IActionResult> Login(LoginDetails loginDetails, string returnUrl = "/home")
        {
            var tracking = new TelemetryClient();
            ClaimsPrincipal claimsPrinciple;
            ViewData["ReturnUrl"] = returnUrl;
            var response = await _userRepository.GetUserAsync(loginDetails);
            var user = response.Item1;

            if (!user.ValidUser)
            {
              TempData["ErrorMessage"] = response.Item2;
              return View(loginDetails);
            }

            var claims = new List<Claim>
            {
              new Claim("sessionguid", user.SessionGuid),
              new Claim("userid", user.UserDetails.Id.ToString()),
              new Claim("currentmarketid", user.UserDetails.DefaultMarketId.ToString()),
              new Claim("name", user.UserDetails.Email),
              new Claim("secentityid", user.UserDetails.SecEntityId.ToString())
            };
            try
            {
                var id = new ClaimsIdentity(claims, "password");
                //tracking.TrackTrace("ClaimsId", SeverityLevel.Information, new Dictionary<string, string> { { "ClaimsId", JsonConvert.SerializeObject(id) } });
                claimsPrinciple = new ClaimsPrincipal(id);
                //tracking.TrackTrace("ClaimsPrinciple", SeverityLevel.Information, new Dictionary<string, string> { { "ClaimsPrinciple", JsonConvert.SerializeObject(claimsPrinciple) } });
            }
            catch (Exception ex)
            {
                tracking.TrackException(ex);
                Console.WriteLine(ex);
                return View(loginDetails);
            }
            
            await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync(HttpContext, "MobileSPAuthCookie", claimsPrinciple);

            CookieHelper.StoreLoginDetails(HttpContext, loginDetails);

            return LocalRedirect(returnUrl);
        }
    }
}

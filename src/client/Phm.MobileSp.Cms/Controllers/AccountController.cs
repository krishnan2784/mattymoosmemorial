﻿using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Controllers
{
    [AiHandleError]
    public class AccountController : CacheController
    {
        private readonly IUserRepository _userRepository;
        public AccountController(IMemoryCache memoryCache, IUserRepository userRepository) : base(memoryCache)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            if (User.Identity.IsAuthenticated)
                RedirectToAction("Index", "Home");

            var loginDetails = new LoginDetails();
#if DEBUG
            loginDetails.UserName = "admin";
            loginDetails.Password = "12345";
            loginDetails.RememberMe = true;
#endif

            return View(loginDetails);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDetails loginDetails, string returnUrl = "/home")
        {
            ViewData["ReturnUrl"] = returnUrl;
            _userRepository.SetAuthToken(Constants.CstAccesstoken);

            var user = await _userRepository.GetUserAsync(loginDetails);

            if (user.ValidUser)
            {
                SetupRepositories(user);
                var claims = new List<Claim>
                {
                    new Claim("sessionguid", user.SessionGuid),
                    new Claim("userid", user.UserDetails.Id.ToString()),
                    new Claim("currentmarketid", user.UserDetails.DefaultMarketId.ToString()),
                    new Claim("name", user.UserDetails.FirstName)
                };
                
                var id = new ClaimsIdentity(claims, "password");
                var p = new ClaimsPrincipal(id);

                await HttpContext.Authentication.SignInAsync("MobileSPAuthCookie", p);

                return LocalRedirect(returnUrl);
            }

            return View(loginDetails);
        }

        public void SetupRepositories(IApplicationUser applicationUser)
        {
            _userRepository.SetAuthToken(applicationUser.SessionGuid);
            _userRepository.SetMarketId(applicationUser.UserDetails.DefaultMarketId);
        }
    }
}
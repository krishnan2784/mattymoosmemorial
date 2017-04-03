using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyModel;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Infrastructure;
using MobileSP_CMS.Infrastructure.Repositories;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Controllers
{
    public class AccountController : CacheController
    {
        public AccountController(IMemoryCache memoryCache) : base(memoryCache)
        {
        }

        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            ClearCache();

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
            var userRepo = (IUserRepository)HttpContext.RequestServices.GetService(typeof(IUserRepository));
            userRepo.BaseRequest = new BaseRequest {AccessToken = Contstants.CstAccesstoken};

            var user = await userRepo.GetUserAsync(loginDetails);

            if (user.ValidUser)
            {
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
    }
}
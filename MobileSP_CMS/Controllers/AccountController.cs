using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyModel;
using MobileSP_CMS.Core.Interfaces.Repositories;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Infrastructure.Repositories;

namespace MobileSP_CMS.Controllers
{
    public class AccountController : BaseController
    {
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
#endif

            return View(loginDetails);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDetails loginDetails, string returnUrl = "/home")
        {
            ViewData["ReturnUrl"] = returnUrl;
            var userRepo = GetService<IUserRepository>();
            var user = await userRepo.GetUserAsync(loginDetails);

            if (user.ValidUser)
            {
                var claims = new List<Claim>
                {
                    new Claim("sessionguid", user.SessionGuid),
                    new Claim("name", user.UserDetails.FirstName)
                };

                var id = new ClaimsIdentity(claims, "password");
                var p = new ClaimsPrincipal(id);

                await HttpContext.Authentication.SignInAsync("MobileSPAuthCookie", p);

                return LocalRedirect(returnUrl);
            }

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync("MobileSPAuthCookie");
            return Redirect("/");
        }
    }
}
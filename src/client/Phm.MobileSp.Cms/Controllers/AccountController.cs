namespace Phm.MobileSp.Cms.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.ApplicationInsights;
    using Microsoft.ApplicationInsights.DataContracts;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Caching.Memory;

    using Newtonsoft.Json;

    using Phm.MobileSp.Cms.Core.Models;
    using Phm.MobileSp.Cms.Core.Models.Interfaces;
    using Phm.MobileSp.Cms.Helpers.Attributes;
    using Phm.MobileSp.Cms.Infrastructure;
    using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

    [AiHandleError]
    public class AccountController : CacheController
    {
        /// <summary>
        /// The user repository.
        /// </summary>
        private readonly IUserRepository userRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountController"/> class.
        /// </summary>
        /// <param name="memoryCache">
        /// The memory cache.
        /// </param>
        /// <param name="userRepository">
        /// The user repository.
        /// </param>
        public AccountController(IMemoryCache memoryCache, IUserRepository userRepository) : base(memoryCache)
        {
            this.userRepository = userRepository;
        }

        [AiHandleError]
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

        [AiHandleError]
        [HttpPost]
        public async Task<IActionResult> Login(LoginDetails loginDetails, string returnUrl = "/home")
        {
            var tracking = new TelemetryClient();
            ClaimsPrincipal claimsPrinciple;
            this.ViewData["ReturnUrl"] = returnUrl;
            this.userRepository.SetAuthToken(Constants.CstAccesstoken);

            var user = await userRepository.GetUserAsync(loginDetails);

            if (!user.ValidUser)
            {
                return View(loginDetails);
            }

            SetupRepositories(user);
            var claims = new List<Claim>
                             {
                                 new Claim("sessionguid", user.SessionGuid),
                                 new Claim("userid", user.UserDetails.Id.ToString()),
                                 new Claim("currentmarketid", user.UserDetails.DefaultMarketId.ToString()),
                                 new Claim("name", user.UserDetails.FirstName)
                             };
           tracking.TrackTrace("Claims Issue", new Dictionary<string, string> { { "claims", JsonConvert.SerializeObject(claims)} });
            

            try
            {
                var id = new ClaimsIdentity(claims, "password");
                tracking.TrackTrace("ClaimsId", SeverityLevel.Information, new Dictionary<string, string> { { "ClaimsId", JsonConvert.SerializeObject(id) } });
                claimsPrinciple = new ClaimsPrincipal(id);
                tracking.TrackTrace("ClaimsPrinciple", SeverityLevel.Information, new Dictionary<string, string> { { "ClaimsPrinciple", JsonConvert.SerializeObject(claimsPrinciple) } });
            }
            catch (System.Exception ex)
            {
                tracking.TrackException(ex);
                return View(loginDetails);
            }

            await this.HttpContext.Authentication.SignInAsync("MobileSPAuthCookie", claimsPrinciple);

            return this.LocalRedirect(returnUrl);
        }

        /// <summary>
        /// The setup repositories.
        /// </summary>
        /// <param name="applicationUser">
        /// The application user.
        /// </param>
        private void SetupRepositories(IApplicationUser applicationUser)
        {
            this.userRepository.SetAuthToken(applicationUser.SessionGuid);
            this.userRepository.SetMarketId(applicationUser.UserDetails.DefaultMarketId);
        }

        [AiHandleError]
        [HttpGet]
        public IActionResult Logout()
        {
            return View();
        }
    }
}
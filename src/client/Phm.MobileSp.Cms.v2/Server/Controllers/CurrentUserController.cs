using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Helpers.Attributes;

namespace Phm.MobileSp.Cms.Server.Controllers
{
    [Authorize]
    [AiHandleError]
    public class CurrentUserController : BaseController
    {
        
      public CurrentUserController(IMemoryCache memoryCache) :base(memoryCache){}

      [AiHandleError]
      [HttpGet]
      public async Task<IActionResult> Logout()
      {
          await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync(HttpContext, "MobileSPAuthCookie");
            ClearCache();
            return View("/Views/Account/Logout.cshtml");
        }
   
      }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Phm.MobileSp.Cms.Helpers.Attributes;
using System.Linq;

namespace Phm.MobileSp.Cms.Controllers
{
    [Authorize]
    [AiHandleError]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {

            if (string.IsNullOrEmpty(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "sessionguid")?.Value))
                return Redirect("/Account/Login");
           return View();

        }
        [AiHandleError]
        public IActionResult Error()
        {
            return View();
        }
    }
}

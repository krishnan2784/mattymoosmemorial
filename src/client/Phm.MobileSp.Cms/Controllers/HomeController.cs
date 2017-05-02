using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Phm.MobileSp.Cms.Helpers.Attributes;

namespace Phm.MobileSp.Cms.Controllers
{
    [Authorize]
    [AiHandleError]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
           return View();

        }
        [AiHandleError]
        public IActionResult Error()
        {
            return View();
        }
    }
}

using Microsoft.AspNetCore.Mvc;

namespace MobileSP_CMS.Controllers
{
    public class BaseController : Controller
    {
        public TService GetService<TService>()
        {
            return (TService)HttpContext.RequestServices.GetService(typeof(TService));
        }
    }
}

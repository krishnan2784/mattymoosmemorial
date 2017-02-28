using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MobileSP_CMS.Controllers
{
    [Authorize]
    public class BaseController : Controller
    {
        private static string _AuthToken { get; set; }
        private static string _UserName { get; set; }

        public TService GetService<TService>()
        {
            return (TService)HttpContext.RequestServices.GetService(typeof(TService));
        }

        public string AuthToken()
        {
            if (string.IsNullOrEmpty(_AuthToken))
            {
                _AuthToken = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "sessionguid").Value;
            }
            return _AuthToken;
        }

        public string UserName()
        {
            if (string.IsNullOrEmpty(_UserName))
            {
                _UserName = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "name").Value;
            }
            return _UserName;
        }
    }
}

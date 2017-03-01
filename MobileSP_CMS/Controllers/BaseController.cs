using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Cli.Utils;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Core.Repositories;
using MobileSP_CMS.Infrastructure;

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

        public TRepository GetRespository<TRepository>() where TRepository : IBaseRepository
        {
            var repo = (TRepository)HttpContext.RequestServices.GetService(typeof(TRepository));
            repo.BaseRequest = new BaseRequest { AccessTokenField = AuthToken() };

            return repo;
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

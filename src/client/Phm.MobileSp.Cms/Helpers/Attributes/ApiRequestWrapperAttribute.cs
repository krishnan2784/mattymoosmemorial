using Microsoft.AspNetCore.Mvc.Filters;
using Phm.MobileSp.Cms.Infrastructure;
using System.Linq;

namespace Phm.MobileSp.Cms.Helpers.Attributes
{
    public class ApiRequestWrapperAttribute : ActionFilterAttribute
    {
        public IHttpClientService _clientService;
        public ApiRequestWrapperAttribute(IHttpClientService clientService)
        {
            _clientService = clientService;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var authToken = context.HttpContext?.User.Claims.FirstOrDefault(x => x.Type == "sessionguid").Value;
            if (!string.IsNullOrEmpty(authToken))
                _clientService.SetAuthToken(authToken);
            base.OnActionExecuting(context);
        }
    }
}
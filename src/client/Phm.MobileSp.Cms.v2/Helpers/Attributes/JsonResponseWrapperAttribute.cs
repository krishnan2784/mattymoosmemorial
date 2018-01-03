using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Helpers.Attributes
{
    public class JsonResponseWrapperAttribute : ActionFilterAttribute
    {
        private TelemetryClient telemetryClient = new TelemetryClient();
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var response = context.Result as JsonResult;
            var wrappedResponse = new BaseResponse<dynamic>();

            if (response != null) {
                if (response.Value is IBaseResponse)
                    return;

                wrappedResponse.Content = response.Value;
            }

            if (context.Exception == null)
            {
                wrappedResponse.Success = true;
                wrappedResponse.Message = "";
            }
            else
            {
                wrappedResponse.Success = false;
                wrappedResponse.Message = "There has been an error, please try again or contact support if this error persists";
                telemetryClient.TrackException(context.Exception);

                context.Exception = null;                
            }
            context.Result = new JsonResult(wrappedResponse);
        }
    }
}
﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MobileSP_CMS.Core.Models;
using NuGet.Protocol.Core.v3;

namespace MobileSP_CMS.Helpers.Attributes
{
    public class JsonResponseWrapperAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var response = context.Result as JsonResult;
            var wrappedResponse = new BaseResponse();

            if (response != null) {
                if (response.Value is BaseResponse)
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
                wrappedResponse.Message = context.Exception.Message;

                context.Exception = null;
            }
            context.Result = new JsonResult(wrappedResponse);
        }
    }
}
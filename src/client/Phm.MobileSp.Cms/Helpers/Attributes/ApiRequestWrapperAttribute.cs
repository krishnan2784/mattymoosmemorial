using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using System.Linq;
using System.Net.Http;

namespace Phm.MobileSp.Cms.Helpers.Attributes
{
    public class ApiRequestWrapperAttribute : ActionFilterAttribute
    {
        IBaseRequest _baseRequest;
        IBaseCriteria _baseCriteria;

        public ApiRequestWrapperAttribute() { }
        public ApiRequestWrapperAttribute(IBaseRequest baseRequest, IBaseCriteria baseCriteria)
        {
            _baseRequest = baseRequest;
            _baseCriteria = baseCriteria;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (_baseRequest!=null)
                _baseRequest.AccessToken = context.HttpContext?.User.Claims.FirstOrDefault(x => x.Type == "sessionguid").Value;
            if (_baseCriteria != null)
                _baseCriteria.MarketId = Convert.ToInt16(context.HttpContext?.User.Claims.FirstOrDefault(x => x.Type == "currentmarketid").Value);

            base.OnActionExecuting(context);
        }
    }
}
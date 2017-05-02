﻿﻿using System;
 using Microsoft.ApplicationInsights;
 using Microsoft.AspNetCore.Mvc.Filters;

namespace Phm.MobileSp.Cms.Helpers.Attributes
{
	[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
	public class AiHandleErrorAttribute :  ExceptionFilterAttribute
    {
		public override void OnException(ExceptionContext filterContext)
		{
			if (filterContext?.HttpContext != null && filterContext.Exception != null)
			{

					/*
                    * Please note: You do not need to construct a new TelemetryClient every time. 
                    * Indeed, we recommend that you reuse a client instance.
                    * You only need to create separate instances, when you need to initialize with different configuration
                    * The default constructor without parameters, uses TelemetryConfiguration.Active
                    */
					var ai = new TelemetryClient();
					ai.TrackException(filterContext.Exception);

			}
			base.OnException(filterContext);
		}


    }
}

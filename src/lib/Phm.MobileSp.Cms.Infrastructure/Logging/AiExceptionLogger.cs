using System;
using Microsoft.ApplicationInsights;

namespace Phm.MobileSp.Cms.Infrastructure
{
    public class AiExceptionLogger :  ExceptionLogger
    {
        public override void Log(System.Web.Http.ExceptionHandling.ExceptionLoggerContext context)
        {
            if (context !=null && context.Exception != null)
            {
                // Note: A single instance of telemetry client is sufficient to track multiple telemetry items.
                var ai = new TelemetryClient();
                ai.TrackException(context.Exception);
            }
            base.Log(context);
        }
    }
}
;
using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class SurveyFeed : BaseFeed
    {
        public virtual List<SurveyQuestion> Questions { get; set; }
        public virtual string SurveyDescription { get; set; }
    }
}

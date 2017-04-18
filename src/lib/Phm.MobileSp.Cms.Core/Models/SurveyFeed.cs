using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class SurveyFeed : BaseFeed
    {
        public virtual List<SurveyQuestion> Questions { get; set; }
        public virtual string SurveyDescription { get; set; }
    }
}

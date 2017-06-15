using System;
using System.Collections.Generic;
using System.Text;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class FeedItemSummary : BaseModel
    {
        public int QuizFeedId { get; set; }
        public decimal AverageScore { get; set; }
        public TimeSpan AverageTime { get; set; }
        public int Submitted { get; set; }
        public int Passed { get; set; }
        public int Failed { get; set; }
    }
}

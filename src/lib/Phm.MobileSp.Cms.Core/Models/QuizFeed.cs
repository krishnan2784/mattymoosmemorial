using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class QuizFeed : BaseFeed
    {
        public virtual List<QuizQuestion> Questions { get; set; }
        public virtual string QuizDescription { get; set; }
        public string OnBoardingMessage { get; set; }
        public string SuccessMessage { get; set; }
        public string FailMessage { get; set; }
    }
}

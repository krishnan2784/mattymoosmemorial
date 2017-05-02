using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class QuizQuestion : BaseModel
    {
        public virtual List<QuizQuestionAnswer> Answers { get; set; }
        public virtual int Order { get; set; }
        public virtual string Question { get; set; }
        public virtual QuizQuestionTypeEnum QuestionType { get; set; }
        public virtual int QuizFeedId { get; set; }
    }
}

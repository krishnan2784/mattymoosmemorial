using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Enumerations;

namespace MobileSP_CMS.Core.Models
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

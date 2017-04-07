using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Enumerations;

namespace MobileSP_CMS.Core.Models
{
    public class SurveyQuestion : BaseModel
    {
        public virtual List<SurveyQuestionAnswer> Answers { get; set; }
        public virtual int Order { get; set; }
        public virtual string Question { get; set; }
        public virtual SurveyQuestionTypeEnum QuestionType { get; set; }
        public virtual int SurveyFeedId { get; set; }
    }
}

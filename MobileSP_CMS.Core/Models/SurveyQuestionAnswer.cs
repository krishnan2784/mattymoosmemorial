using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public abstract class SurveyQuestionAnswer : BaseModel
    {
        public virtual string Answer { get; set;}
        public virtual bool IsFreeText { get; set; }
        public virtual int Order { get; set; }
        public virtual int SurveyQuestionId { get; set; }
    }
}

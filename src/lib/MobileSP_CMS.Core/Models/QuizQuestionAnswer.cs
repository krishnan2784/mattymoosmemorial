using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public class QuizQuestionAnswer : BaseModel
    {
        public virtual string Answer { get; set; }
        public virtual bool IsCorrect { get; set; }
        public virtual int Order { get; set; }
        public virtual int QuizQuestionId { get; set; }
    }
}

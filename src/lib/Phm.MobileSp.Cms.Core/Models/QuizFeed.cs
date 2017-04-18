using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public class QuizFeed : BaseFeed
    {
        public virtual List<QuizQuestion> Questions { get; set; }
        public virtual string QuizDescription { get; set; }
    }
}

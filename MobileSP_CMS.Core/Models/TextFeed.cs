using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public abstract class TextFeed : BaseFeed
    {
        public virtual string BodyText { get; set; }
    }
}

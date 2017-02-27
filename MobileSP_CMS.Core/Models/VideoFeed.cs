using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public abstract class VideoFeed : BaseFeed
    {
        public virtual MediaInfo MainVideo { get; set; }
        public virtual string VideoDescription { get; set; }
    }
}

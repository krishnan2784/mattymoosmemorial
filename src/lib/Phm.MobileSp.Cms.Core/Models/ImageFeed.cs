using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class ImageFeed : BaseFeed
    {
        public virtual string ImageDescription { get; set; }
        public virtual MediaInfo MainImage { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class CampaignFeed : BaseFeed
    {
        public virtual string CampaignDescription { get; set; }
        public virtual List<BaseFeed> Feeds { get; set; }
    }
}

using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class CampaignFeed : BaseFeed
    {
        public virtual string CampaignDescription { get; set; }
        public virtual List<BaseFeed> Feeds { get; set; }
    }
}

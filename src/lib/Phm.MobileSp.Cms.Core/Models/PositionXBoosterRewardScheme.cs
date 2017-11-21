using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class PositionXBoosterRewardScheme:BaseRewardScheme
    {
        public virtual ICollection<PositionXBoosterItem> Items{ get; set; }
    }
}

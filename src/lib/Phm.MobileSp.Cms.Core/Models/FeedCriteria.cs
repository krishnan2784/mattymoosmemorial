using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class FeedCriteria : ReadCriteria
    {
        public virtual int? Day { get; set; }
    }
}

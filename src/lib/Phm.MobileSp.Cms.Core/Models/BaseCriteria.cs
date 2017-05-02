using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class BaseCriteria : IBaseCriteria
    {
        public virtual int? Id { get; set; }
        public virtual int? MarketId { get; set; }
        public virtual bool? Deleted {get; set;}
        public virtual bool? Enabled {get; set;}
        public virtual bool? Published {get; set;}
        public virtual bool? ValidVersion {get; set;}
        public virtual int? Version {get; set;}
    }
}

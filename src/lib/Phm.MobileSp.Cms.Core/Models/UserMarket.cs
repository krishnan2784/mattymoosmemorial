using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class UserMarket 
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual bool IsDefault { get; set; }
        public virtual bool IsMaster { get; set; }
        public virtual bool IsLive { get; set; }

    }

}

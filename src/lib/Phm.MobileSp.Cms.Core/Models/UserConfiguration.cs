using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{

    public class UserConfiguration 
    {
        public bool IsDefault { get; set; }

        public int MarketId { get; set; }

        public int RoleId { get; set; }

        public int UserId { get; set; }
    }
}

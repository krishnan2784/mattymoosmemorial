using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Models
{

    public class UserConfiguration : IUserConfiguration
    {
        public bool IsDefault { get; set; }

        public int MarketId { get; set; }

        public int RoleId { get; set; }

        public int UserId { get; set; }
    }
}

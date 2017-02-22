using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Interfaces.Models
{
    public class UserConfiguration : IUserConfiguration
    {
        public bool IsDefault { get; set; }

        public int MarketId { get; set; }

        public int RoleId { get; set; }

        public int UserId { get; set; }
    }
}

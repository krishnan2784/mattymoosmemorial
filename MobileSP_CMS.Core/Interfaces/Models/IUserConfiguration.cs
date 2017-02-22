using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Interfaces.Models
{
    public interface IUserConfiguration
    {
        bool IsDefault { get; set; }

        int MarketId { get; set; }

        int RoleId { get; set; }

        int UserId { get; set; }
    }
}

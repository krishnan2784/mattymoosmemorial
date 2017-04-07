using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Models
{
    public interface IUserMarket
    {
        int Id { get; set; }
        string Name { get; set; }
        bool IsDefault { get; set; }
    }
    
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public interface IUserMarket
    {
        int Id { get; set; }
        string Name { get; set; }
        bool IsDefault { get; set; }
    }
    
}

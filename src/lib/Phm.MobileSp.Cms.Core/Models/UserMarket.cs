using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Models
{
    public class UserMarket : IUserMarket
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual bool IsDefault { get; set; }
    }
    
}

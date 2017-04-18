using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class CorporateApp : BaseModel
    {
        public virtual AppTypeEnum AppType { get; set; }
        public virtual string LinkUrl { get; set; }
    }
}

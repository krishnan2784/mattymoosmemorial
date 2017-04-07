using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Enumerations;

namespace MobileSP_CMS.Core.Models
{
    public class CorporateApp : BaseModel
    {
        public virtual AppTypeEnum AppType { get; set; }
        public virtual string LinkUrl { get; set; }
    }
}

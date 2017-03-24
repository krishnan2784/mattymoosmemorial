using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Models
{
    public class Market: BaseVersionableEntity
    {
        public virtual int BrandId { get; set; }
        public virtual string Code { get; set; }
        public virtual int DefaultLanguageId { get; set; }
        public virtual bool? IsLive { get; set; }
        public virtual bool IsMaster { get; set; }
        public virtual string Name { get; set; }
        public virtual bool UseMetricSystem { get; set; }
    }
    
}

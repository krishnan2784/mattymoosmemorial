using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public class BaseRequest : IBaseRequest
    {
        public virtual bool? Deleted {get; set;}
        public virtual bool? Enabled {get; set;}
        public virtual bool? Published {get; set;}
        public virtual bool? ValidVersion {get; set;}
        public virtual int? Version {get; set;}
    }
}

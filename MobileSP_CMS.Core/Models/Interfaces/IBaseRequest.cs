using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public interface IBaseRequest
    {
        bool? Deleted {get; set;}
        bool? Enabled {get; set;}
        bool? Published {get; set;}
        bool? ValidVersion {get; set;}
        int? Version {get; set;}
    }
}

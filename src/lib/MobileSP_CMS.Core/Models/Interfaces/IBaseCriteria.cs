using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public interface IBaseCriteria
    {

        int? Id { get; set; }
        int? MarketId { get; set; }
        bool? Deleted {get; set;}
        bool? Enabled {get; set;}
        bool? Published {get; set;}
        bool? ValidVersion {get; set;}
        int? Version {get; set;}
    }
}

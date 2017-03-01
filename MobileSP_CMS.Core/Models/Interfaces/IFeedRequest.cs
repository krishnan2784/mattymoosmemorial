using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public interface IFeedRequest : IReadRequest
    {
        int? Day { get; set; }
        int? Id { get; set; }
        int? MarketId { get; set; }
    }
}

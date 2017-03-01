using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public class FeedRequest : ReadRequest, IFeedRequest
    {
        public virtual int? Day { get; set; }
        public virtual int? Id { get; set; }
        public virtual int? MarketId { get; set; }
    }
}

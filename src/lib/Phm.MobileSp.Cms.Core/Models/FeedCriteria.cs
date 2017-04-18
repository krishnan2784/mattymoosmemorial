using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public class FeedCriteria : ReadCriteria, IFeedCriteria
    {
        public virtual int? Day { get; set; }
    }
}

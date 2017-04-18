using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Core.Models
{
    public interface IFeedCriteria : IReadCriteria
    {
        int? Day { get; set; }
    }
}

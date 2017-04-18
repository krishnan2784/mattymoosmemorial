using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class ReadCriteria : BaseCriteria, IReadCriteria
    {
        public virtual string OrderBy {get; set;}
        public virtual int PageNumber {get; set;}
        public virtual int PageSize {get; set;}
    }
}

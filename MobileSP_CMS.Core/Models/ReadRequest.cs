using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public class ReadRequest : BaseRequest, IReadRequest
    {
        public virtual string OrderBy {get; set;}
        public virtual int PageNumber {get; set;}
        public virtual int PageSize {get; set;}
    }
}

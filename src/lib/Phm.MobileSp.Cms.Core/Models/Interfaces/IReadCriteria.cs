using System ;
using System.Collections.Generic;
using System.Linq ;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public interface IReadCriteria : IBaseCriteria
    {
        string OrderBy {get; set;}
        int PageNumber {get; set;}
        int PageSize {get; set;}
    }
}

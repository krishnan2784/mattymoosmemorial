using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class ReadCriteria : BaseCriteria
    {
        public virtual string OrderBy {get; set;}
        public virtual int PageNumber {get; set;}
        public virtual int PageSize {get; set;}
    }
}

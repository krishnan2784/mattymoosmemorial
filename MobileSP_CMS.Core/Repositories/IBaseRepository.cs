using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Repositories
{
    public interface IBaseRepository
    {
        IBaseRequest BaseRequest { get; set; }
        IBaseCriteria RequestCriteria { get; set; }
    }
}
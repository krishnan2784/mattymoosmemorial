using MobileSP_CMS.Core.Models;

namespace MobileSP_CMS.Core.Repositories
{
    public interface IBaseRepository
    {
        string AuthToken { get; set; }
        IBaseRequest RequestCriteria { get; set; }
    }
}
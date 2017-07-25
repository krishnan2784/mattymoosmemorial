using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository
    {
        BaseRequest BaseRequest { get; }
        BaseCriteria BaseRequestCriteria { get; }
        void SetAuthToken(string authToken);
        void SetMarketId(int marketId);
    }
}
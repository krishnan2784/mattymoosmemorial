using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public abstract class BaseRepository : IBaseRepository
    {
        protected IBaseRequest BaseRequest;
        protected IBaseCriteria BaseRequestCriteria;

        protected BaseRepository(IBaseRequest baseRequest, IBaseCriteria baseRBaseCriteria)
        {
            BaseRequest = baseRequest;
            BaseRequestCriteria = baseRBaseCriteria;
        }

        public void SetAuthToken(string authToken)
        {
            BaseRequest.AccessToken = authToken;
        }

        public void SetMarketId(int marketId)
        {
            BaseRequestCriteria.MarketId = marketId;
        }
    }
}
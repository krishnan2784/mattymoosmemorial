using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class BaseRepository : IBaseRepository
    {
        public BaseRequest BaseRequest { get; }
        public BaseCriteria BaseRequestCriteria { get; }

        public BaseRepository() {
            BaseRequest = new BaseRequest();
            BaseRequestCriteria = new BaseCriteria();
        }
        public BaseRepository(BaseRequest baseRequest, BaseCriteria baseCriteria)
        {
            BaseRequest = baseRequest;
            BaseRequestCriteria = baseCriteria;
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
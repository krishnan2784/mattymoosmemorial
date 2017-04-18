using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Infrastructure.Repositories
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
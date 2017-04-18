namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository
    {
        void SetAuthToken(string authToken);
        void SetMarketId(int marketId);
    }
}
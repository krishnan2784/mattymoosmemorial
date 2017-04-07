namespace MobileSP_CMS.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository
    {
        void SetAuthToken(string authToken);
        void SetMarketId(int marketId);
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Repositories
{
    public interface IFeedRepository : IReadingRepository
    {
        Task<TFeedType> GetFeedItemAsync<TFeedType>() where TFeedType : BaseFeed;
        Task<IEnumerable<TFeedType>> GetFeedItemsAsync<TFeedType>() where TFeedType : BaseFeed;
        Task<TFeedType> CreateFeedItemAsync<TFeedType>(TFeedType feedItem) where TFeedType : BaseFeed;
        Task<bool> DeleteFeedItemAsync(int feedItemId);
    }
}

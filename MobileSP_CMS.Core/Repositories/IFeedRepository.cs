using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Repositories
{
    public interface IFeedRepository : IReadingRepository
    {
        Task<TFeedType> GetFeedItemAsync<TFeedType>(int feedItemId) where TFeedType : IBaseFeed;
        Task<IEnumerable<TFeedType>> GetFeedItemsAsync<TFeedType>() where TFeedType : IBaseFeed;
        Task<TFeedType> CreateFeedItemAsync<TFeedType>(TFeedType feedItem) where TFeedType : IBaseFeed;
        Task<bool> DeleteFeedItemAsync(int feedItemId);
    }
}

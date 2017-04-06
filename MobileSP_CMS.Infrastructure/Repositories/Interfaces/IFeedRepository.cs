using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using MobileSP_CMS.Core.Models;

namespace MobileSP_CMS.Infrastructure.Repositories.Interfaces
{
    public interface IFeedRepository : IMLearningBaseRepository
    {
        Task<dynamic> GetFeedItemAsync(int feedItemId);
        Task<IEnumerable<dynamic>> GetFeedItemsAsync();
        Task<TFeedItem> CreateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto;
        Task<TFeedItem> UpdateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto;
        Task<bool> DeleteFeedItemAsync(int feedItemId);
    }
}

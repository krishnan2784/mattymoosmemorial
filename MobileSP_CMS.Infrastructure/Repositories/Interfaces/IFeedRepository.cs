using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Enumerations;

namespace MobileSP_CMS.Infrastructure.Repositories.Interfaces
{
    public interface IFeedRepository : IReadingRepository
    {
        Task<dynamic> GetFeedItemAsync(int feedItemId);
        Task<IEnumerable<dynamic>> GetFeedItemsAsync();
        Task<IEnumerable<dynamic>> GetFeedItemsAsync(FeedCategoryEnum selectedCategory);
        Task<dynamic> CreateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto;
        Task<dynamic> UpdateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto;
        Task<bool> DeleteFeedItemAsync(int feedItemId);
    }
}

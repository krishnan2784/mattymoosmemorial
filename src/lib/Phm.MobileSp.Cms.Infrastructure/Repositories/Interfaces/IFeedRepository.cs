using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using System;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IFeedRepository
    {
        Task<dynamic> GetFeedItemAsync(int feedItemId);
        Task<dynamic> GetMarketFeedItems(int marketId);
        Task<dynamic> GetFeedItems(FeedCriteria criteria);
        Task<TFeedItem> CreateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto;
        Task<TFeedItem> UpdateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto;
        Task<bool> DeleteFeedItemAsync(int feedItemId);
        Task<bool> CopyFeedItemToMarketAsync(int feedItemId, List<int> marketIds);
    }
}

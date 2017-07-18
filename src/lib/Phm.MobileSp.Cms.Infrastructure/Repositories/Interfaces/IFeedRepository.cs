using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using System;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
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
        Task<dynamic> GetQuizFeedSummaries(int feedItemId);
        Task<IEnumerable<dynamic>> GetQuizResultsSummariesEX(int feedItemId, decimal lowerBoundary, decimal higherBoundary, int userGroupId);
        Task<dynamic> GetSurveyFeedSummaries(int feedItemId);
        Task<dynamic> GetObservationFeedSummaries(int feedItemId);
        Task<bool> CopyFeedItemToMarketAsync(int feedItemId, List<int> marketIds);
        Task<dynamic> GetLeaderBoard(int currentMarketId, DateTime? startDate, DateTime? endDate);
        Task<dynamic> GetUserPointsHistory(int userId, DateTime? startDate, DateTime? endDate);
    }
}

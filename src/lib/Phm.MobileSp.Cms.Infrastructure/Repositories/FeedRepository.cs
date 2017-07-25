using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System;
using Microsoft.Extensions.Options;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class FeedRepository : BaseRepository, IFeedRepository
    {
        public FeedRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "Feeds") {       }

        public async Task<dynamic> GetFeedItemAsync(int feedItemId)
        {
            var response = await GetAsync(feedItemId);
            return response?.Content?.First();
        }
        
        public async Task<IEnumerable<dynamic>> GetFeedItemsAsync() 
        {
            var response = await GetAsync();
            return response?.Content();
        }

        public async Task<TFeedItem> CreateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var response = await CreateAsync(feedItem);
            return response?.Content;
        }


        public async Task<TFeedItem> UpdateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var response = await UpdateAsync(feedItem);
            return response?.Content;
        }


        public async Task<bool> DeleteFeedItemAsync(int feedItemId)
        {
            var response = await DeleteAsync(feedItemId);
            return response.Success;
        }

        public async Task<dynamic> GetQuizFeedSummaries(int feedItemId)
        {
            var response = await GetAsync($"/GetQuizFeedSummariesAsync/{feedItemId}");
            return response?.Content.First();
        }

        public async Task<IEnumerable<dynamic>> GetQuizResultsSummariesEX(int feedItemId, decimal lowerBoundary, decimal higherBoundary, int userGroupId)
        {
            var response = await GetAsync($"/GetQuizResultsSummariesEXAsync/{feedItemId}");
            return response?.Content.First();
        }

        public async Task<dynamic> GetSurveyFeedSummaries(int feedItemId)
        {
            var response = await GetAsync($"/GetSurveyFeedSummariesAsync/{feedItemId}");
            return response?.Content.First();
        }

        public async Task<dynamic> GetObservationFeedSummaries(int feedItemId)
        {
            var response = await GetAsync($"/GetSurveyFeedSummariesAsync/{feedItemId}");
            return response?.Content.First();
        }

        public async Task<bool> CopyFeedItemToMarketAsync(int feedItemId, List<int> marketIds)
        {
            var m = string.Empty;
            for (var i = 0; i < marketIds.Count; i++)
                m += $"MarketIds[{i}]={marketIds[i]}";

            var response = await PostAsync($"/CopyFeedToMarketAsync?BaseFeedId={feedItemId}{m}", null);
            return response?.Content.First();
        }

        public async Task<dynamic> GetLeaderBoard(int currentMarketId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var d = (startDate == null ? "" : "&startDate=" + startDate) + (endDate == null ? "" : "&endDate=" + endDate);
            var response = await GetAsync($"/GetLeaderBoardDataAsync?MarketId={currentMarketId}{d}");
            return response?.Content.First();
        }

        public async Task<dynamic> GetUserPointsHistory(int userId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var d = (startDate == null ? "" : "&startDate=" + startDate) + (endDate == null ? "" : "&endDate=" + endDate);
            var response = await GetAsync($"/GetUserPointsHistoryAsync?UserId={userId}{d}");
            return response?.Content.First();
        }

    }
}

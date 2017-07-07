using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class FeedRepository : MLearningBaseRepository, IFeedRepository
    {
        private readonly IMLearningCoreContract _proxyClient;
        private readonly MobileSPCoreService.ICoreContract _proxyCoreClient;

        public FeedRepository(IMLearningCoreContract proxyClient, MobileSPCoreService.ICoreContract proxyCoreClient, IBaseRequest baseRequest,
            IBaseCriteria baseCriteria)
            : base(baseRequest, baseCriteria)
        {
            _proxyClient = proxyClient;
            _proxyCoreClient = proxyCoreClient;
        }

        public async Task<dynamic> GetFeedItemAsync(int feedItemId)
        {
            var request = GetRequest(new GetFeedsRequest
            {
                Criteria = GetCriteria(new FeedCriteriaDto
                {
                    Id = feedItemId
                })
            });

            var response = await _proxyClient.GetFeedsAsync(request);
            return response.Feeds.FirstOrDefault();
        }
        
        public async Task<IEnumerable<dynamic>> GetFeedItemsAsync() 
        {
            var request = GetRequest(new GetFeedsRequest {
                Criteria = GetCriteria(new FeedCriteriaDto())
            });
                
            var response = await _proxyClient.GetFeedsAsync(request);
            return response.Feeds;
        }

        public async Task<TFeedItem> CreateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var request = GetRequest(new CreateFeedRequest
            {
                CurrentFeed = feedItem.MapFeedItem<TFeedItem, TDestinationDto>()
            });

            var response = await _proxyClient.CreateFeedAsync(request);
            return response.CurrentFeed.MapFeedItem<BaseFeedDto, TFeedItem>();
        }


        public async Task<TFeedItem> UpdateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            // set it to null as we don't want this being overriden
            feedItem.MarketId = null;
            var originalFeedItem = await GetFeedItemAsync(feedItem.Id);
            feedItem = FeedMapper.ConvertUnpopulatedFieldsToModel(originalFeedItem, feedItem);
            feedItem.DeletedAt = null;
            var request = GetRequest(new UpdateFeedRequest()
            {
                CurrentFeed = feedItem.MapFeedItem<TFeedItem, TDestinationDto>()
            });

            var response = await _proxyClient.UpdateFeedAsync(request);
            return response.CurrentBaseFeed.MapFeedItem<BaseFeedDto, TFeedItem>(); 
        }


        public async Task<bool> DeleteFeedItemAsync(int feedItemId)
        {
            var request = GetRequest(new DeleteFeedRequest { FeedId = feedItemId });
            var response = await _proxyClient.DeleteFeedAsync(request);
            return response.Deleted;
        }

        public async Task<dynamic> GetFeedItemSummary(int feedItemId)
        {
            var request = GetRequest(new GetQuizFeedSummariesRequest
            {
                Criteria = GetCriteria(new QuizFeedSummaryCriteriaDto()
                {
                    QuizFeedId = feedItemId
                })
            });
            var response = await _proxyClient.GetQuizFeedSummariesAsync(request);
            return response.QuizSummaries.FirstOrDefault();
        }

        public async Task<IEnumerable<dynamic>> GetFeedItemResultList(int feedItemId, decimal lowerBoundary, decimal higherBoundary, int userGroupId)
        {
            var request = GetRequest(new GetQuizResultsSummariesEXRequest
            {
                Criteria = GetCriteria(new QuizResultsSummariesEXCriteriaDto()
                {
                    QuizFeedId = feedItemId,
                    LowerBoundary = lowerBoundary,
                    HigherBoundary = higherBoundary,
                    UserGroupId = userGroupId
                })
            });
            var response = await _proxyClient.GetQuizResultsSummariesEXAsync(request);
            return response.QuizResultsSummaries;
        }
        
        public async Task<bool> CopyFeedItemToMarketAsync(int feedItemId, List<int> marketIds)
        {

            var request = new MobileSPCoreService.CopyFeedToMarketRequest
            {
                BaseFeedId = feedItemId,
                AccessToken = BaseRequest.AccessToken,
                MarketIds = marketIds
            };
            var response = await _proxyCoreClient.CopyFeedToMarketAsync(request);
            return response.BaseFeeds?.Count == marketIds.Count;
        }

        public async Task<dynamic> GetLeaderBoard(int currentMarketId, DateTime? startDate = null, DateTime? endDate = null)
        {
            try
            {
                var request = GetRequest(new GetLeaderBoardDataRequest
                {
                    Criteria = GetCriteria(new LeaderBoardDataCriteriaDto()
                    {
                        MarketId = currentMarketId,
                        StartDate = startDate,
                        EndDate = endDate
                    })
                });
                var response = await _proxyClient.GetLeaderBoardDataAsync(request);
                return response.LeaderBoardData;   
            }catch (Exception e)
            {
                return null;
            }         
        }

    }
}

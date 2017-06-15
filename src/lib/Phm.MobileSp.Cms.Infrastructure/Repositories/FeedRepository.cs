using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class FeedRepository : MLearningBaseRepository, IFeedRepository
    {
        private readonly IMLearningCoreContract _proxyClient;
        private readonly MobileSPCoreService.ICoreContract _proxyCoreClient;

        public FeedRepository(IMLearningCoreContract proxyClient, MobileSPCoreService.ICoreContract proxyCoreClient, IBaseRequest baseRequest,
            IBaseCriteria baseRBaseCriteria)
            : base(baseRequest, baseRBaseCriteria)
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

        public async Task<List<FeedItemSummary>> GetFeedItemSummary(int feedItemId)
        {
            var request = GetRequest(new GetQuizFeedSummariesRequest
            {
                Criteria = GetCriteria(new QuizFeedSummaryCriteriaDto()
                {
                    QuizFeedId = feedItemId
                })
            });
            var response = await _proxyClient.GetQuizFeedSummariesAsync(request);
            var mapper = new AutoMapperGenericsHelper<QuizSummaryDto, FeedItemSummary>();
            var summary = mapper.ConvertToDbEntity(response.QuizSummaries);
            return summary;
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
    }
}

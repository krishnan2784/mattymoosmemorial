using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MLearningCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public class FeedRepository : MLearningBaseRepository, IFeedRepository
    {
        private readonly IMLearningCoreContract _proxyClient;

        public FeedRepository(IMLearningCoreContract proxyClient, IBaseRequest baseRequest,
            IBaseCriteria baseRBaseCriteria)
            : base(baseRequest, baseRBaseCriteria)
        {
            _proxyClient = proxyClient;
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
            var request = GetRequest(new DeleteFeedRequest {FeedId = feedItemId});
            var response = await _proxyClient.DeleteFeedAsync(request);
            return response.Deleted;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MLearningCoreService;
using MobileSPCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Core.Repositories;
using MobileSP_CMS.Infrastructure;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public class FeedRepository : BaseRepository, IFeedRepository
    {
        private readonly MLearningCoreContractClient _proxy = new MLearningCoreContractClient();

        public async Task<TFeedType> GetFeedItemAsync<TFeedType>() where TFeedType : BaseFeed
        {
            var list = await GetFeedItemsAsync<TFeedType>();
            return list.FirstOrDefault();
        }

        public async Task<IEnumerable<TFeedType>> GetFeedItemsAsync<TFeedType>() where TFeedType : BaseFeed
        {
            try
            {
                var request = GetRequest(new GetFeedsRequest {
                    Criteria = GetCriteria(new FeedCriteriaDto())
                });
                
                var response = await _proxy.GetFeedsAsync(request);
                
                return response.Feeds.MapFeed<BaseFeedDto, TFeedType>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<TFeedType> CreateFeedItemAsync<TFeedType>(TFeedType feedItem) where TFeedType : BaseFeed
        {

            var request = GetRequest(new CreateFeedRequest());
            request.CurrentFeed = feedItem.MapFeedItem<TFeedType, BaseFeedDto>();

            var response = await _proxy.CreateFeedAsync(request);
            
            return response.CurrentFeed.MapFeedItem<BaseFeedDto, TFeedType>();
        }


        public async Task<TFeedType> UpdateFeedItemAsync<TFeedType>(TFeedType feedItem) where TFeedType : BaseFeed
        {
            dynamic mapper = new AutoMapperGenericsHelper<TFeedType, BaseFeedDto>();

            var request = GetRequest(new UpdateFeedRequest()
            {
                CurrentFeed = mapper.ConvertToDbEntity(feedItem)
            });

            var response = await _proxy.UpdateFeedAsync(request);

            mapper = new AutoMapperGenericsHelper<BaseFeedDto, TFeedType>();
            return mapper.ConvertToDbEntity(response.CurrentBaseFeed);
        }


        public async Task<bool> DeleteFeedItemAsync(int feedItemId)
        {
            var request = GetRequest(new DeleteFeedRequest());
            request.FeedId = feedItemId;

            var response = await _proxy.DeleteFeedAsync(request);

            return response.Deleted;
        }
    }
}

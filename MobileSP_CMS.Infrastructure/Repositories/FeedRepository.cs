using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MLearningCoreService;
using MobileSPCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Core.Repositories;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public class FeedRepository : BaseRepository, IFeedRepository
    {
        private readonly MLearningCoreContractClient _proxy = new MLearningCoreContractClient();

        public async Task<TFeedType> GetFeedItemAsync<TFeedType>(int feedItemId) where TFeedType : BaseFeed
        {
            CriteriaCriteria = new FeedCriteria {Id = feedItemId};
            var list = await GetFeedItemsAsync<TFeedType>();
            return list.FirstOrDefault();
        }

        public async Task<IEnumerable<TFeedType>> GetFeedItemsAsync<TFeedType>() where TFeedType : BaseFeed
        {
            var request = GetRequest<GetFeedsRequest>(BaseRequest);
            request.Criteria = GetCriteria<FeedCriteriaDto>(CriteriaCriteria);

            var response = await _proxy.GetFeedsAsync(request);

            var mapper = new AutoMapperGenericsHelper<BaseFeedDto, TFeedType>();
            return mapper.ConvertToDbEntity(response.Feeds);
        }

        public async Task<TFeedType> CreateFeedItemAsync<TFeedType>(TFeedType feedItem) where TFeedType : BaseFeed
        {
            dynamic mapper = new AutoMapperGenericsHelper<TFeedType, BaseFeedDto>();

            var request = GetRequest<CreateFeedRequest>(BaseRequest);
            request.CurrentFeed = mapper.ConvertToDbEntity(feedItem);

            var response = await _proxy.CreateFeedAsync(request);

            mapper = new AutoMapperGenericsHelper<BaseFeedDto, TFeedType>();
            return mapper.ConvertToDbEntity(response.CurrentFeed);
        }


        public async Task<TFeedType> UpdateFeedItemAsync<TFeedType>(TFeedType feedItem) where TFeedType : BaseFeed
        {
            dynamic mapper = new AutoMapperGenericsHelper<TFeedType, BaseFeedDto>();

            var request = GetRequest<UpdateFeedRequest>(BaseRequest);
            request.CurrentFeed = mapper.ConvertToDbEntity(feedItem);

            var response = await _proxy.UpdateFeedAsync(request);

            mapper = new AutoMapperGenericsHelper<BaseFeedDto, TFeedType>();
            return mapper.ConvertToDbEntity(response.CurrentBaseFeed);
        }


        public async Task<bool> DeleteFeedItemAsync(int feedItemId)
        {
            var request = GetRequest<DeleteFeedRequest>(BaseRequest);
            request.FeedId = feedItemId;

            var response = await _proxy.DeleteFeedAsync(request);

            return response.Deleted;
        }
    }
}

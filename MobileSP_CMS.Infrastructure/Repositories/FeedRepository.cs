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
        private MLearningCoreContractClient _proxy;
        
        public async Task<TFeedType> GetFeedItemAsync<TFeedType>(int feedItemId) where TFeedType : BaseFeed
        {
            RequestCriteria = new FeedRequest {Id = feedItemId};
            var list = await GetFeedItemsAsync<TFeedType>();
            return list.FirstOrDefault();
        }
        
        public async Task<IEnumerable<TFeedType>> GetFeedItemsAsync<TFeedType>() where TFeedType : BaseFeed
        {
            _proxy = new MLearningCoreContractClient();

            var response = await _proxy.GetFeedsAsync(new GetFeedsRequest()
            {
                AccessToken = AuthToken,
                Criteria = GetCriteria<FeedCriteriaDto>(RequestCriteria)
            });

            var mapper = new AutoMapperGenericsHelper<BaseFeedDto, TFeedType>();
            return mapper.ConvertToDbEntity(response.Feeds);
        }
    }
}

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
            _proxy = new MLearningCoreContractClient();

            var response = await _proxy.GetFeedsAsync(new GetFeedsRequest()
            {
                AccessToken = AuthToken,
                Criteria = new FeedCriteriaDto() { Id = feedItemId}
            });
                
            var mapper = new AutoMapperGenericsHelper<BaseFeedDto, TFeedType>();
            return mapper.ConvertToDbEntity(response.Feeds.FirstOrDefault());
        }
        
        public async Task<IEnumerable<TFeedType>> GetFeedItemsAsync<TFeedType>() where TFeedType : BaseFeed
        {
            _proxy = new MLearningCoreContractClient();

            var response = await _proxy.GetFeedsAsync(new GetFeedsRequest()
            {
                AccessToken = AuthToken
            });

            var mapper = new AutoMapperGenericsHelper<BaseFeedDto, TFeedType>();
            return mapper.ConvertToDbEntity(response.Feeds);
        }
    }
}

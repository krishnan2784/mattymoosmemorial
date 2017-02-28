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
    public class FeedRepository : IFeedRepository
    {
        private MLearningCoreContractClient _proxy;

        public async Task<BaseFeed> GetFeedItemAsync(int feedItemId)
        {
            _proxy = new MLearningCoreContractClient();

            var response = await _proxy.GetFeedsAsync(new GetFeedsRequest()
            {
                AccessToken = Contstants.CstAccesstoken,
                Criteria = new FeedCriteriaDto() { Id = feedItemId}
            });
                
            var mapper = new AutoMapperGenericsHelper<BaseFeedDto, BaseFeed>();
            return mapper.ConvertToDbEntity(response.Feeds.FirstOrDefault());
        }
        
        public async Task<IEnumerable<BaseFeed>> GetFeedItemsAsync()
        {
            _proxy = new MLearningCoreContractClient();

            var response = await _proxy.GetFeedsAsync(new GetFeedsRequest()
            {
                AccessToken = Contstants.CstAccesstoken
            });

            var mapper = new AutoMapperGenericsHelper<BaseFeedDto, BaseFeed>();
            return mapper.ConvertToDbEntity(response.Feeds);
        }
    }
}

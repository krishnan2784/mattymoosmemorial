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
            : base(connStrings, baseRequest, baseCriteria, "Feed") {       }

        public async Task<dynamic> GetFeedItemAsync(int feedItemId)
        {
            var response = await GetAsync<dynamic>(feedItemId);
            return response?.Content?.First();
        }
        
        public async Task<IEnumerable<dynamic>> GetFeedItemsAsync() 
        {
            var response = await GetAsync<dynamic>();
            return response?.Content();
        }

        public async Task<TFeedItem> CreateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var response = await CreateAsync<TFeedItem>(feedItem);
            return response?.Content;
        }


        public async Task<TFeedItem> UpdateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var response = await UpdateAsync<TFeedItem>(feedItem);
            return response?.Content;
        }


        public async Task<bool> DeleteFeedItemAsync(int feedItemId)
        {
            var response = await DeleteAsync<dynamic>(feedItemId);
            return response.Success;
        }

        public async Task<bool> CopyFeedItemToMarketAsync(int feedItemId, List<int> marketIds)
        {

            var response = await PutAsync<dynamic>(new {
                BaseFeedId = feedItemId,
                MarketIds = marketIds
            });
            return response?.Content.First();
        }

    }
}

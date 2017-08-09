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
using System.Net.Http;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class FeedRepository : BaseRepository, IFeedRepository
    {
        public FeedRepository(IHttpClientService client): base(client, "Feed") {       }

        public async Task<dynamic> GetFeedItemAsync(int feedItemId)
        {
            var response = GetResponseModel<List<dynamic>>(await GetAsync(feedItemId));
            return response.First();
        }

        public async Task<IEnumerable<dynamic>> GetFeedItems(FeedCriteria criteria)
        {
            var response = await GetAsync(criteria);
            var feeds = GetResponseModel<List<dynamic>>(response);
            return feeds;
        }

        public async Task<IEnumerable<dynamic>> GetMarketFeedItems(int marketId)
        {
            return await GetFeedItems(new FeedCriteria() { MarketId = marketId });
        }

        public async Task<TFeedItem> CreateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var response = GetResponseModel<TFeedItem>(await CreateAsync(feedItem));
            return response;
        }


        public async Task<TFeedItem> UpdateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var response = GetResponseModel<TFeedItem>(await UpdateAsync(feedItem));
            return response;
        }


        public async Task<bool> DeleteFeedItemAsync(int feedItemId)
        {
            var response = GetResponseModel<bool>(await DeleteAsync(feedItemId));
            return response;
        }

        public async Task<bool> CopyFeedItemToMarketAsync(int feedItemId, List<int> marketIds)
        {
            var response = GetResponseModel<bool>(await PutAsync(new {
                BaseFeedId = feedItemId,
                MarketIds = marketIds
            }));
            return response;            
        }

    }
}

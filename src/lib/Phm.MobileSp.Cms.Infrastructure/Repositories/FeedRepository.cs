using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Enumerations;
using Microsoft.Extensions.Options;
using System.Net.Http;
using Newtonsoft.Json;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class FeedRepository : BaseRepository, IFeedRepository
    {
        public FeedRepository(IHttpClientService client): base(client, "Feed") {       }

        public async Task<dynamic> GetFeedItemAsync(int feedItemId)
        {
            var response = await GetAsync(feedItemId);
            return GetResponseModel<List<dynamic>>(response).First();

            //var type = Type.GetType($"Phm.MobileSp.Cms.Core.Models.{Enum.GetName(typeof(FeedTypeEnum),feed.FeedType)}Feed", true);
            //var model = JsonConvert.DeserializeObject(feed, type);
            //return response.StringifiedObject;
        }

        public async Task<dynamic> GetFeedItems(FeedCriteria criteria)
        {
            var response = await GetAsync(criteria);
            return JsonConvert.DeserializeObject(response.StringifiedObject);
        }

        public async Task<dynamic> GetMarketFeedItems(int marketId)
        {
            return await GetFeedItems(new FeedCriteria() { MarketId = marketId, Enabled = null });
        }

        public async Task<TFeedItem> CreateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var response = await CreateAsync(feedItem);
            return GetResponseModel<TFeedItem>(response);
        }

        public async Task<TFeedItem> UpdateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var originalItem = await GetFeedItemAsync(feedItem.Id);
            feedItem = FeedMapper.ConvertUnpopulatedFieldsToModel(originalItem, feedItem);
            var response = await UpdateAsync(feedItem);
            return GetResponseModel<TFeedItem>(response);
        }

        public async Task<bool> DeleteFeedItemAsync(int feedItemId)
        {
            var response = await DeleteAsync(feedItemId);
            return JsonConvert.DeserializeObject<dynamic>(response.StringifiedObject);
        }

        public async Task<bool> CopyFeedItemToMarketAsync(int feedItemId, List<int> marketIds)
        {
            var response = await PutAsync(new {
                BaseFeedId = feedItemId,
                MarketIds = marketIds
            });
            return response.Success;
            // return JsonConvert.DeserializeObject<List<BaseFeed>>(response.StringifiedObject).Count == marketIds.Count;            
        }

    }
}

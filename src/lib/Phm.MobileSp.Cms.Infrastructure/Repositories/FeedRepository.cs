﻿using System.Collections.Generic;
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
    public class FeedRepository : MarketContentRepository, IFeedRepository
    {
        public FeedRepository(IHttpClientService client): base(client, CopiedElementTypeEnum.Feed, "Feed") {       }

        public async Task<dynamic> GetFeedItemAsync(int feedItemId)
        {
	        var f = await GetFeedItems(new FeedCriteria() {Id = feedItemId, Enabled = null });
			return f;

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

        public async Task<TFeedItem> CreateFeedItemAsync<TFeedItem>(TFeedItem feedItem) where TFeedItem : BaseFeed {
            var response = await CreateAsync(feedItem);
            return GetResponseModel<TFeedItem>(response);
        }

        public async Task<TFeedItem> UpdateFeedItemAsync<TFeedItem>(TFeedItem feedItem) where TFeedItem : BaseFeed {
            //var oResponse = await GetAsync(feedItem.Id);
            //var originalItem = GetResponseModel<List<TFeedItem>>(oResponse).First();
            //feedItem = FeedMapper.ConvertUnpopulatedFieldsToModel(originalItem, feedItem);
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

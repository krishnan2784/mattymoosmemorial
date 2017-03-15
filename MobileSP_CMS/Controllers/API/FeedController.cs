using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Core.Repositories;
using MobileSP_CMS.Infrastructure.Repositories;

namespace MobileSP_CMS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class FeedController : BaseController
    {
        [HttpGet("[action]")]
        public async Task<IEnumerable<IBaseFeed>> GetFeedItems()
        {
            var feedRepo = GetRespository<IFeedRepository>();
            var feedItems = await feedRepo.GetFeedItemsAsync<BaseFeed>();
            return feedItems;
        }

        [HttpGet("[action]")]
        public async Task<TFeedType> GetFeedItem<TFeedType>(int id) where TFeedType : IBaseFeed
        {
            var feedRepo = GetRespository<IFeedRepository>();
            var feedItem = await feedRepo.GetFeedItemAsync<TFeedType>(id);
            return feedItem;
        }

        [HttpGet("[action]")]
        public async Task<TextFeed> GetTextFeedItem(int id)
        {
            return await GetFeedItem<TextFeed>(id);
        }

        [HttpPost("[action]")]
        public async Task<TextFeed> UpdateTextFeedItem(TextFeed model)
        {
            if (model.Id == 0)
                return await CreateFeedItem(model);
            return await UpdateFeedItem(model);
        }

        [HttpPost("[action]")]
        public async Task<TFeedType> CreateFeedItem<TFeedType>(TFeedType model) where TFeedType : IBaseFeed
        {
            var feedRepo = GetRespository<IFeedRepository>();
            var feedItemResponse = await feedRepo.CreateFeedItemAsync(model);
            return feedItemResponse;
        }

        [HttpPost("[action]")]
        public async Task<TFeedType> UpdateFeedItem<TFeedType>(TFeedType model) where TFeedType : IBaseFeed
        {
            var feedRepo = GetRespository<IFeedRepository>();
            var feedItemResponse = await feedRepo.CreateFeedItemAsync(model);
            return feedItemResponse;
        }

    }
}

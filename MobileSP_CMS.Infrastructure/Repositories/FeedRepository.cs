using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MLearningCoreService;
using MobileSPCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Infrastructure;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public class FeedRepository : BaseRepository, IFeedRepository
    {
        private readonly MLearningCoreContractClient _proxy = new MLearningCoreContractClient();

        public async Task<dynamic> GetFeedItemAsync(int feedItemId)
        {
            RequestCriteria.Id = feedItemId;
            var list = await GetFeedItemsAsync();
            return list.Any() ? list.FirstOrDefault() : new BaseFeed();
        }

        public async Task<IEnumerable<dynamic>> GetFeedItemsAsync() 
        {
            try
            {
                var request = GetRequest(new GetFeedsRequest {
                    Criteria = GetCriteria(new FeedCriteriaDto())
                });
                
                var response = await _proxy.GetFeedsAsync(request);
                
                return response.Feeds;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<dynamic> CreateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var request = GetRequest(new CreateFeedRequest()
            {
                CurrentFeed = feedItem.MapFeedItem<TFeedItem, TDestinationDto>()
            });

            var response = await _proxy.CreateFeedAsync(request);
            
            return response.CurrentFeed.MapFeedItem<BaseFeedDto, dynamic>(); ;
        }


        public async Task<dynamic> UpdateFeedItemAsync<TFeedItem, TDestinationDto>(TFeedItem feedItem) where TFeedItem : BaseFeed
            where TDestinationDto : BaseFeedDto
        {
            var originalFeedItem = await GetFeedItemAsync(feedItem.Id);
            feedItem = FeedMapper.ConvertUnpopulatedFieldsToModel(originalFeedItem, feedItem);// mapper.ConvertNonNullFields(originalFeedItem, feedItem); 

            var request = GetRequest(new UpdateFeedRequest()
            {
                CurrentFeed = feedItem.MapFeedItem<TFeedItem, TDestinationDto>()
            });

            var response = await _proxy.UpdateFeedAsync(request);
            
            return response.CurrentBaseFeed.MapFeedItem<BaseFeedDto, TFeedItem>(); 
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

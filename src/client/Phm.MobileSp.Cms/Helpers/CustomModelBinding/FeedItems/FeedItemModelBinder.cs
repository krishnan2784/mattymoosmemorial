using System;
using System.Reflection;
using Newtonsoft.Json;
using Phm.MobileSp.Cms.Contracts;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Helpers.CustomModelBinding.FeedItems
{
    public class FeedItemModelBinder : IFeedItemModelBinder
    {
        public BaseFeed GetFeedItemModel(string requestBody)
        {
            var feedItemModel = JsonConvert.DeserializeObject<BaseFeed>(requestBody);
            var feedType = feedItemModel.FeedType.ToString();

            var type = Type.GetType($"Phm.MobileSp.Cms.Core.Models.{feedType}Feed, Phm.MobileSp.Cms.Core", true);
            if (!typeof(BaseFeed).IsAssignableFrom(type))
            {
                throw new InvalidOperationException("Bad Type");
            }
            dynamic model = JsonConvert.DeserializeObject(requestBody, type);
            return model;
        }
    }
}

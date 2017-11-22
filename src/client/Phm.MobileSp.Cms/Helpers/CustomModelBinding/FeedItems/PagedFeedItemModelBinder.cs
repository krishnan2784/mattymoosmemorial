using System;
using Newtonsoft.Json;
using Phm.MobileSp.Cms.Contracts;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Helpers.CustomModelBinding.FeedItems
{
    public class PagedFeedItemModelBinder : IFeedItemModelBinder
    {
        public BaseFeed GetFeedItemModel(string requestBody)
        {
            dynamic pageM = JsonConvert.DeserializeObject<dynamic>(requestBody);
            var pages = pageM["baseFeedPages"];
	        try
	        {
		        var pageModel = JsonConvert.DeserializeObject<PagedFeed>(requestBody);

		        for (var i = 0; i < pageModel.BaseFeedPages.Count; i++)
		        {
			        var pageType = pageModel.BaseFeedPages[i].BasePageFeedType.ToString();
			        var type = Type.GetType($"Phm.MobileSp.Cms.Core.Models.{pageType}FeedPage, Phm.MobileSp.Cms.Core", true);
			        pageModel.BaseFeedPages[i] = pages[i].ToObject(type);
		        }

		        return pageModel;
	        }
	        catch (Exception e)
	        {
		        return null;
	        }
        }
    }
}

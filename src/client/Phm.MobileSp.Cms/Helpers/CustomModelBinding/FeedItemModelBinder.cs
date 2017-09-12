using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Reflection;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Helpers.CustomModelBinding
{
    public class FeedItemModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var bodyStr = "";
            var req = bindingContext.HttpContext.Request;
            using (StreamReader reader = new StreamReader(req.Body, Encoding.UTF8, true, 1024, true))
            {
                bodyStr = reader.ReadToEnd();
            }
            var feedItemModel = JsonConvert.DeserializeObject<BaseFeed>(bodyStr);
            var feedType = feedItemModel.FeedType.ToString();
            if (feedType=="Paged")
                return new PagedFeedItemModelBinder(bodyStr).BindModelAsync(bindingContext);

            var type = Type.GetType($"Phm.MobileSp.Cms.Core.Models.{feedType}Feed, Phm.MobileSp.Cms.Core", true);
            if (!typeof(BaseFeed).IsAssignableFrom(type))
            {
                throw new InvalidOperationException("Bad Type");
            }
            var model = JsonConvert.DeserializeObject(bodyStr, type);
            bindingContext.Model = model;

            bindingContext.Result = ModelBindingResult.Success(model);
            return TaskCache.CompletedTask;
        }
    }

    public class PagedFeedItemModelBinder : IModelBinder
    {
        private string bodyString = null;
        public PagedFeedItemModelBinder() { }
        public PagedFeedItemModelBinder(string bString) => this.bodyString = bString;

        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bodyString == null)
            {
                var req = bindingContext.HttpContext.Request;
                using (StreamReader reader = new StreamReader(req.Body, Encoding.UTF8, true, 1024, true))
                {
                    bodyString = reader.ReadToEnd();
                }
            }

            dynamic pageM = JsonConvert.DeserializeObject<dynamic>(bodyString);
            var pages = pageM["baseFeedPages"];

            var pageModel = JsonConvert.DeserializeObject<PagedFeed>(bodyString);

            for (var i = 0; i < pageModel.BaseFeedPages.Count; i++)
            {
                var pageType = pageModel.BaseFeedPages[i].BasePageFeedType.ToString();
                var type = Type.GetType($"Phm.MobileSp.Cms.Core.Models.{pageType}FeedPage, Phm.MobileSp.Cms.Core", true);
                pageModel.BaseFeedPages[i] = pages[i].ToObject(type);
            }
            
            bindingContext.Model = pageModel;
            bindingContext.Result = ModelBindingResult.Success(pageModel);
            return TaskCache.CompletedTask;
        }
    }
}

using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using Phm.MobileSp.Cms.Contracts;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Helpers.CustomModelBinding.FeedItems
{
    public class BaseFeedItemModelBinder : IModelBinder
    {
        private IFeedItemModelBinder _modelBinder;

        public BaseFeedItemModelBinder(IFeedItemModelBinder modelBinder)
        {
            _modelBinder = modelBinder;
        }

        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            string bodyStr;
            var req = bindingContext.HttpContext.Request;
            using (var reader = new StreamReader(req.Body, Encoding.UTF8, true, 1024, true))
            {
                bodyStr = reader.ReadToEnd();
            }

            var feedItemModel = JsonConvert.DeserializeObject<BaseFeed>(bodyStr);
            var feedType = feedItemModel.FeedType.ToString();

            if (feedType == "Paged")
                _modelBinder = new PagedFeedItemModelBinder();

            var model = _modelBinder.GetFeedItemModel(bodyStr);

            bindingContext.Model = model;
            bindingContext.Result = ModelBindingResult.Success(model);

            return TaskCache.CompletedTask;
        }
    }
}
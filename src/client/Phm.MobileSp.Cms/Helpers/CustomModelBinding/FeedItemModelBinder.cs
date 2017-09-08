using System;
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
            var type = Type.GetType($"Phm.MobileSp.Cms.Core.Models.{feedItemModel.FeedType.ToString()}Feed, Phm.MobileSp.Cms.Core", true);
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
}

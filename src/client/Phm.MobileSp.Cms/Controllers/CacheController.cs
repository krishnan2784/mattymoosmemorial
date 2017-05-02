using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Helpers.Attributes;

namespace Phm.MobileSp.Cms.Controllers
{
    [AiHandleError]
    public class CacheController : Controller
    {
        public IMemoryCache _cache;

        public CacheController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        public void ClearCache()
        {
            foreach (var key in CacheKeys.AllKeys())
            {
                _cache.Remove(key);
            }
        }
    }

    public static class CacheKeys
    {
        public static List<string> AllKeys()
        {
            return new List<string>()
            {
                FEEDITEMS,
                USERLIST,
                USERMARKETS
            };
        }
 
        public const string FEEDITEMS = "FeedItems";
        public const string USERLIST = "UserList";
        public const string USERMARKETS = "UserMarkets";
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Cli.Utils;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Controllers
{
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

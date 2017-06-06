using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Controllers.API
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class AccountManagement : MarketController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMarketRepository _marketRepository;
        public AccountManagement(IMemoryCache memoryCache, IUserRepository userRepository, IMarketRepository marketRepository) 
            : base(memoryCache, userRepository, marketRepository)
        {
            _userRepository = userRepository;
            _marketRepository = marketRepository;
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> UserList()
        {
            var cachedUsers = await _cache.GetOrCreateAsync(CacheKeys.USERLIST, entry => _userRepository.GetUsersAsync());
            return Json(cachedUsers);
        }
        
        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetUserMarkets()
        {
            var cachedUsers = await _cache.GetOrCreateAsync(CacheKeys.USERMARKETS, async entry =>
            {
                var list = await _userRepository.GetUserMarkets(_marketRepository, UserId);
                return list;
            });
            return Json(cachedUsers);
        }
    }
}

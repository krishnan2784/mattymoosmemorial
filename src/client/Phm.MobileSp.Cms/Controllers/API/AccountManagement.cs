using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Controllers.API
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class AccountManagement : MarketController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMarketRepository _marketRepository;
        public AccountManagement(IMemoryCache memoryCache, IUserRepository userRepository, IMarketRepository marketRepository, 
            IBaseRequest baseRequest, IBaseCriteria baseCriteria) 
            : base(memoryCache, userRepository, marketRepository, baseRequest, baseCriteria)
        {
            _userRepository = userRepository;
            _marketRepository = marketRepository;
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetCurrentUser()
        {
            var response = await _userRepository.GetCurrentUser();
            return Json(new BaseResponse(response));
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetUsers(int? userId = null)
        {
            var response = await _userRepository.GetUsersAsync(CurrentMarketId, userId);
            return Json(new BaseResponse(response));
        }
        
        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetSecGroups()
        {
            var response = await _userRepository.GetSecGroupsAsync();
            return Json(response);
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

        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateUser([FromBody]UserTemplate user) 
        {
            if (user.Id == 0)
                return Json(await _userRepository.CreateUserAsync(user));
            else
                return Json(await _userRepository.UpdateUserAsync(user));
        }
    }
}
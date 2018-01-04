using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Server.RestAPI
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class AccountManagement : MarketController
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserTemplateRepository _userTemplateRepository;
        private readonly ISecurityGroupsRepository _secGroupsRepository;
        
        public AccountManagement(IMemoryCache memoryCache, IUserRepository userRepository, IMarketRepository marketRepository,
            IUserConfigurationRepository userConfigRepository, IMarketUserRepository marketUserRepository, IUserTemplateRepository userTemplateRepository,
            ISecurityGroupsRepository secGroupsRepository) 
            : base(memoryCache, marketRepository, userConfigRepository, marketUserRepository)
        {
            _userRepository = userRepository;
            _userTemplateRepository = userTemplateRepository;
            _secGroupsRepository = secGroupsRepository;
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetCurrentUser()
        {
            var response = await _userRepository.GetCurrentUser();
            return Json(new BaseResponse<User>(response));
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetUsers(int? userId = null)
        {
            var response = await _userTemplateRepository.GetUsersAsync(CurrentMarketId, userId);
            return Json(new BaseResponse<dynamic>(response));
        }
        
        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetSecGroups()
        {
            var response = await _secGroupsRepository.GetSecGroupsByMarketAsync(CurrentMarketId);
            return Json(response);
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<JsonResult> GetUserMarkets()
        {
            var cachedUsers = await _cache.GetOrCreateAsync(CacheKeys.USERMARKETS, async entry =>
            {
                var list = await _userRepository.GetUserMarkets(UserId);
                return list;
            });
            return Json(cachedUsers);
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateUser([FromBody]UserTemplate user) 
        {
            if (user.Id == 0)
                return Json(await _userTemplateRepository.CreateUserAsync(user));
            else
                return Json(await _userTemplateRepository.UpdateUserAsync(user));
        }
    }
}

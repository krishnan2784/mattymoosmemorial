using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Server.Controllers;

namespace Phm.MobileSp.Cms.Server.RestAPI
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class SecurityEntityFeaturesController : BaseController
    {
        private readonly ISecurityEntityFeaturesRepository _secEntityFeaturesRepo;
        private readonly IUserTemplateRepository _userTemplateRepo;
	    private readonly ISecurityGroupsRepository _securityGroupsRepository;

		public SecurityEntityFeaturesController(IMemoryCache memoryCache, ISecurityEntityFeaturesRepository secEntityFeaturesRepo,
			IUserTemplateRepository userTemplateRepo, ISecurityGroupsRepository securityGroupsRepository) 
            : base(memoryCache)
        {
	        _secEntityFeaturesRepo = secEntityFeaturesRepo;
	        _userTemplateRepo = userTemplateRepo;
			_securityGroupsRepository = securityGroupsRepository;
		}

	    [HttpGet("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> GetEntityPermissions(int id)
	    {
		    if (id == 0 || id == CurrentUserSecEntityId)
		    { 
			    var cacheResult = await _cache.GetOrCreateAsync(CacheKeys.USERPERMISSIONS, async entry =>
			    {
				    var response = await _secEntityFeaturesRepo.GetCurrentUsersPermissions(UserId, CurrentUserSecEntityId);
				    return Json(new BaseResponse<dynamic>(response));
			    });
			    return cacheResult;
		    }
			var r = await _secEntityFeaturesRepo.GetEntityPermissions(id);
			return Json(new BaseResponse<dynamic>(r));
	    }
	}
}

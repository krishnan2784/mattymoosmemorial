using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using MLearningCoreService;
using Newtonsoft.Json;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System;
using System.Linq;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Helpers;

namespace Phm.MobileSp.Cms.Controllers.API
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
		    var response = await _secEntityFeaturesRepo.GetEntityPermissions(id);
		    return Json(new BaseResponse<dynamic>(response));
	    }

	    [HttpGet("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> GetUserPermissions(int userId = 0)
	    {
		    if (userId == 0)
			    userId = UserId;

		    if (userId == UserId)
		    { // this is gross, but i need to come up with a better caching solution where i can add keys
			    var cacheResult = await _cache.GetOrCreateAsync(CacheKeys.USERPERMISSIONS, async entry =>
			    {
				    var userProfile = (await _userTemplateRepo.GetUsersAsync(0, userId)).FirstOrDefault();
				    if (userProfile?.SecGroup?.Id > 0)
				    {
					    var secGroup = await _securityGroupsRepository.GetSecGroupById(userProfile.SecGroup.Id);
					    if (secGroup?.SecEntityId > 0)
					    {

						    var response = await _secEntityFeaturesRepo.GetEntityPermissions((int)secGroup.SecEntityId);
						    return Json(new BaseResponse<dynamic>(new { permissions = response, secEntityId = secGroup.SecEntityId }));
					    }
				    }
				    return Json(new BaseResponse<dynamic>(false, "Failed to get permissions.", null));
				});
			    return cacheResult;
		    }
		    else {
				var userProfile = (await _userTemplateRepo.GetUsersAsync(0, userId)).FirstOrDefault();
				if (userProfile?.SecGroup?.Id > 0)
				{
					var secGroup = await _securityGroupsRepository.GetSecGroupById(userProfile.SecGroup.Id);
					if (secGroup?.SecEntityId > 0){

						var response = await _secEntityFeaturesRepo.GetEntityPermissions((int)secGroup.SecEntityId);
						return Json(new BaseResponse<dynamic>(new { permissions = response, secEntityId = secGroup.SecEntityId }));
					}
				}
				return Json(new BaseResponse<dynamic>(false, "Failed to get permissions.", null));
		    }
		}
	}
}

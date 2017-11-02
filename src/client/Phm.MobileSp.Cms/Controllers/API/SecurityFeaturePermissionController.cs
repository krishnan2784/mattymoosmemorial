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
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Controllers.API
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class SecurityFeaturePermissionController : BaseController
    {
        private readonly ISecurityFeaturePermissionsRepository _featurePermissionsRepo;

        public SecurityFeaturePermissionController(IMemoryCache memoryCache, ISecurityFeaturePermissionsRepository featurePermissionsRepo) 
            : base(memoryCache)
        {
	        _featurePermissionsRepo = featurePermissionsRepo;
        }

	    [HttpGet("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> GetUserPermissions(int id)
	    {
		    ;
		    var response = await _featurePermissionsRepo.GetUserPermissions(id);
		    return Json(new BaseResponse<dynamic>(response));
		}

	    [HttpGet("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> GetUserGroupPermissions(int id)
	    {
		    ;
		    var response = await _featurePermissionsRepo.GetUserGroupPermissions(id);
		    return Json(new BaseResponse<dynamic>(response));
	    }
		
    }
}

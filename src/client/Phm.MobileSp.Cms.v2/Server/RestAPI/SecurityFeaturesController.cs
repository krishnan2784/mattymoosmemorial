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
    public class SecurityFeaturesController : BaseController
    {
        private readonly ISecurityFeaturesRepository _secFeaturesRepo;

        public SecurityFeaturesController(IMemoryCache memoryCache, ISecurityFeaturesRepository secFeaturesRepo) 
            : base(memoryCache)
        {
	        _secFeaturesRepo = secFeaturesRepo;
        }

	    [HttpGet("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> GetSecurityFeatures()
	    {
		    var response = await _secFeaturesRepo.GetPermissions();
		    return Json(new BaseResponse<dynamic>(response));
		}
		
    }
}

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
    public class SecurityEntityFeaturesController : BaseController
    {
        private readonly ISecurityEntityFeaturesRepository _secEntityFeaturesRepo;

        public SecurityEntityFeaturesController(IMemoryCache memoryCache, ISecurityEntityFeaturesRepository secEntityFeaturesRepo) 
            : base(memoryCache)
        {
	        _secEntityFeaturesRepo = secEntityFeaturesRepo;
        }

	    [HttpGet("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> GetEntityPermissions(int id)
	    {
		    var response = await _secEntityFeaturesRepo.GetEntityPermissions(id);
		    return Json(new BaseResponse<dynamic>(response));
		}
		
    }
}

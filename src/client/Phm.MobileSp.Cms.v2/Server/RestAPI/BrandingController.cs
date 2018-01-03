using System;
using System.Collections.Generic;
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
    public class BrandingController : BaseController
    {
        private readonly IBrandingConfigurationsRepository _brandingConfigRepo;

        public BrandingController(IMemoryCache memoryCache, IBrandingConfigurationsRepository brandingConfigRepo) 
            : base(memoryCache)
        {
			_brandingConfigRepo = brandingConfigRepo;
        }
        
        [HttpGet("[action]")]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
		public async Task<JsonResult> Get()
        {
            var response = await _brandingConfigRepo.GetBrandingConfigurationsAsync(CurrentMarketId);
            return Json(new BaseResponse<dynamic>(response));
        }

        [HttpPost("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> Update([FromBody]List<BrandingElement> brandingElements)
        {
            var response = await _brandingConfigRepo.UpdateBrandingConfigurationsAsync(brandingElements);
	        var success = response != null && Convert.ToInt32(response) == brandingElements.Count;
            return Json(new BaseResponse<dynamic>(success, success ? "Branding was successfully updated." : "Failed to update branding. Please try again.", response));
        }

    }
}

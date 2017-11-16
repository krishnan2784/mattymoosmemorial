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
    public class CompetitionController : BaseController
    {
        private readonly ICompetitionRepository _competitionRepo;

        public CompetitionController(IMemoryCache memoryCache, ICompetitionRepository competitionRepo) 
            : base(memoryCache)
        {
			_competitionRepo = competitionRepo;
        }
        
        [HttpGet]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
		public async Task<JsonResult> Get()
        {
            var response = await _competitionRepo.GetCompetitionAsync(CurrentMarketId);
            return Json(new BaseResponse<dynamic>(response));
        }

        [HttpPost]
        [JsonResponseWrapper]
        public async Task<JsonResult> Update([FromBody]dynamic competition)
        {
            var response = await _competitionRepo.UpdateCompetitionAsync(competition);
	        var success = response != null && response.Id > 0;
            return Json(new BaseResponse<dynamic>(success, success ? "Competition was successfully updated." : "Failed to update competition. Please try again.", response));
        }

    }
}
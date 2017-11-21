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
    public class ActiveCompetitionController : BaseController
    {
        private readonly IActiveCompetitionRepository _activeCompetitionRepo;

        public ActiveCompetitionController(IMemoryCache memoryCache, IActiveCompetitionRepository activeCompetitionRepo) 
            : base(memoryCache)
        {
	        _activeCompetitionRepo = activeCompetitionRepo;
        }
        
        [HttpGet]
        [JsonResponseWrapper]
        [ResponseCache(CacheProfileName = "NoCache")]
		public async Task<JsonResult> Get()
        {
            var response = await _activeCompetitionRepo.GetActiveCompetitionAsync(CurrentMarketId);
            return Json(new BaseResponse<dynamic>(response));
        }

	}
}

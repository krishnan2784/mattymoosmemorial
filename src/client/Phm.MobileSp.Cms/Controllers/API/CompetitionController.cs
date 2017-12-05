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
    public class CompetitionController : MarketContentController
	{
        private readonly ICompetitionRepository _competitionRepo;

        public CompetitionController(IMemoryCache memoryCache, ICompetitionRepository competitionRepo, IMarketRepository marketRepository,
	        IUserConfigurationRepository userConfigRepository, IMarketUserRepository marketUserRepository)
	        : base(memoryCache, marketRepository, userConfigRepository, marketUserRepository, competitionRepo)
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

	    [HttpPost("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> Create([FromBody]Competition competition)
	    {
			var response = await _competitionRepo.CreateCompetitionAsync(competition);
		    var success = response != null && response.Id > 0;
		    return Json(new BaseResponse<dynamic>(success, success ? "Competition was successfully created." : "Failed to create competition. Please try again.", response));
	    }

	    [HttpPost]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> Update([FromBody]Competition competition)
	    {
		    competition.MarketId = CurrentMarketId;
			if (competition.Id == 0)
			    return await Create(competition);

		    var response = await _competitionRepo.UpdateCompetitionAsync(competition);
		    return Json(new BaseResponse<dynamic>(response, response ? "Competition was successfully updated." : "Failed to update competition. Please try again.", response));
		}

	    [HttpPost("[action]")]
		[JsonResponseWrapper]
	    public async Task<JsonResult> Delete(int id)
	    {
		    var response = await _competitionRepo.DeleteCompetitionAsync(id);
		    return Json(new BaseResponse<dynamic>(response, response ? "Competition was successfully deleted." : "Failed to delete competition. Please try again.", response));
	    }

	}
}

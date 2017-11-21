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
	public class RewardSchemesController : BaseController
	{
		private readonly IRewardSchemesRepository _rewardSchemesRepo;

		public RewardSchemesController(IMemoryCache memoryCache, IRewardSchemesRepository rewardSchemesRepo)
			: base(memoryCache)
		{
			_rewardSchemesRepo = rewardSchemesRepo;
		}

		[HttpGet]
		[JsonResponseWrapper]
		[ResponseCache(CacheProfileName = "NoCache")]
		public async Task<JsonResult> Get()
		{
			var response = await _rewardSchemesRepo.GetRewardSchemesAsync(CurrentMarketId);
			return Json(new BaseResponse<dynamic>(response));
		}

		[HttpPost("[action]")]
		[JsonResponseWrapper]
		public async Task<JsonResult> Create([FromBody]PositionXBoosterRewardScheme rewardSchemes)
		{
			var response = await _rewardSchemesRepo.CreateRewardSchemesAsync(rewardSchemes);
			var success = response != null && response.Id > 0;
			return Json(new BaseResponse<dynamic>(success, success ? "Reward scheme was successfully created." : "Failed to create reward scheme. Please try again.", response));
		}

		[HttpPost]
		[JsonResponseWrapper]
		public async Task<JsonResult> Update([FromBody]PositionXBoosterRewardScheme rewardSchemes)
		{
			if (rewardSchemes.Id == 0)
				return await Create(rewardSchemes);

			var response = await _rewardSchemesRepo.UpdateRewardSchemesAsync(rewardSchemes);
			var success = response != null && response.Id > 0;
			return Json(new BaseResponse<dynamic>(success, success ? "Reward scheme was successfully updated." : "Failed to update reward scheme. Please try again.", response));
		}

		[HttpPost("[action]")]
		[JsonResponseWrapper]
		public async Task<JsonResult> Delete(int id)
		{
			var response = await _rewardSchemesRepo.DeleteRewardSchemesAsync(id);
			return Json(new BaseResponse<dynamic>(response, response ? "Reward scheme was successfully deleted." : "Failed to delete reward scheme. Please try again.", response));
		}

	}
}

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
	public class TermsAndConditionsController : BaseController
	{
		private readonly ITermsAndConditionsRepository _termsAndConditionsRepo;

		public TermsAndConditionsController(IMemoryCache memoryCache, ITermsAndConditionsRepository termsAndConditionsRepo)
			: base(memoryCache)
		{
			_termsAndConditionsRepo = termsAndConditionsRepo;
		}

		[HttpGet]
		[JsonResponseWrapper]
		[ResponseCache(CacheProfileName = "NoCache")]
		public async Task<JsonResult> Get()
		{
			var response = await _termsAndConditionsRepo.GetTermsAndConditionsAsync(CurrentMarketId);
			return Json(new BaseResponse<dynamic>(response));
		}

		[HttpPost("[action]")]
		[JsonResponseWrapper]
		public async Task<JsonResult> Create([FromBody]TermsAndCondition termsAndConditions)
		{
			var response = await _termsAndConditionsRepo.CreateTermsAndConditionsAsync(termsAndConditions);
			var success = response != null && response.Id > 0;
			return Json(new BaseResponse<dynamic>(success, success ? "Terms and conditions were successfully created." : "Failed to create terms and conditions. Please try again.", response));
		}

		[HttpPost]
		[JsonResponseWrapper]
		public async Task<JsonResult> Update([FromBody]TermsAndCondition termsAndConditions)
		{
			termsAndConditions.MarketId = CurrentMarketId;
			if (termsAndConditions.Id == 0)
				return await Create(termsAndConditions);

			var response = await _termsAndConditionsRepo.UpdateTermsAndConditionsAsync(termsAndConditions);
			var success = response != null && response.Id > 0;
			return Json(new BaseResponse<dynamic>(success, success ? "Terms and conditions were successfully updated." : "Failed to update terms and conditions. Please try again.", response));
		}

		[HttpPost("[action]")]
		[JsonResponseWrapper]
		public async Task<JsonResult> Delete(int id)
		{
			var response = await _termsAndConditionsRepo.DeleteTermsAndConditionsAsync(id);
			return Json(new BaseResponse<dynamic>(response, response ? "Terms and conditions were successfully deleted." : "Failed to delete terms and conditions. Please try again.", response));
		}

	}
}

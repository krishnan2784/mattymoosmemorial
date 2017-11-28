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
	public class UserFeaturePermissionsController : BaseController
	{
		private readonly IUserFeaturePermissionsRepository _userFeaturePermissionsRepository;

		public UserFeaturePermissionsController(IMemoryCache memoryCache, IUserFeaturePermissionsRepository userFeaturePermissionsRepository)
			: base(memoryCache)
		{
			_userFeaturePermissionsRepository = userFeaturePermissionsRepository;
		} 

		[HttpPost]
		[JsonResponseWrapper]
		public async Task<JsonResult> Update([FromBody]List<SecFeaturePermission> secEntityPermissions)
		{
			var response = await _userFeaturePermissionsRepository.UpdateEntityPermissions(secEntityPermissions);
			var success = response != null && secEntityPermissions.Count > 0;
			_cache.Remove(CacheKeys.USERPERMISSIONS+secEntityPermissions[0]?.SecEntityId);
			return Json(new BaseResponse<dynamic>(success, success ? "Permissions were successfully updated." : "Failed to update permissions. Please try again.", response));
		}

		[HttpPost("[action]")]
		[JsonResponseWrapper]
		public async Task<JsonResult> Delete(int id)
		{
			var response = await _userFeaturePermissionsRepository.DeleteEntityPermissions(id);
			return Json(new BaseResponse<dynamic>(response, response ? "Permissions were successfully deleted." : "Failed to delete permissions. Please try again.", response));
		}

	}
}

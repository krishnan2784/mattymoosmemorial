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
    public class SecurityGroupController : BaseController
    {
        private readonly ISecurityGroupUsersRepository _secGroupUsersRepository;

        public SecurityGroupController(IMemoryCache memoryCache, ISecurityGroupUsersRepository secGroupUsersRepository) 
            : base(memoryCache)
        {
	        _secGroupUsersRepository = secGroupUsersRepository;
        }

	    [HttpGet("[action]")]
	    [JsonResponseWrapper]
	    public async Task<JsonResult> GetSecGroupUsers(int id)
	    {
		    ;
		    var response = await _secGroupUsersRepository.GetSecGroupsUsersAsync(id);
		    return Json(new BaseResponse<dynamic>(response));
		}		
    }
}

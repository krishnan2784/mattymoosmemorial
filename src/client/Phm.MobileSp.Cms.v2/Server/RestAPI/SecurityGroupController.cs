using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Server.Controllers;

namespace Phm.MobileSp.Cms.Server.RestAPI
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

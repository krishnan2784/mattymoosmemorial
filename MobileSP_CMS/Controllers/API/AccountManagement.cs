using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Repositories;
using MobileSP_CMS.Infrastructure.Repositories;

namespace MobileSP_CMS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountManagement : BaseController
    {
        [HttpGet("[action]")]
        public async Task<IEnumerable<User>> UserList()
        {
            var accountRepo = GetRespository<IUserRepository>();
            var users = await accountRepo.GetUsersAsync();
            return users;
        }
    }
}

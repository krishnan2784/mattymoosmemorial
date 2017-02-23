using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobileSP_CMS.Core.Interfaces.Models;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Infrastructure.Repositories;

namespace MobileSP_CMS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountManagement : Controller
    {
        [HttpGet("[action]")]
        public async Task<IEnumerable<IUser>> UserList()
        {
            var accountRepo = new UserRepository();
            var users = await accountRepo.GetUsersAsync();
            return users;
        }
    }
}

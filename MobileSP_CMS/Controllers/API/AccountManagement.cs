using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Infrastructure.Repositories;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountManagement : BaseController
    {
        public AccountManagement(IMemoryCache memoryCache) : base(memoryCache){ }

        [HttpGet("[action]")]
        public async Task<IEnumerable<User>> UserList()
        {
            var accountRepo = GetRespository<IUserRepository>();
            var users = await accountRepo.GetUsersAsync();
            return users;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Interfaces.Models;

namespace MobileSP_CMS.Core.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<IApplicationUser> GetUserAsync(ILogin userDetails);
        Task<IEnumerable<string>> GetUserRoles(IApplicationUser user);
        Task<IEnumerable<IUser>> GetUsersAsync();
    }
}

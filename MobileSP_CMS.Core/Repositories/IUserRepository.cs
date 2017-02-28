using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models;

namespace MobileSP_CMS.Core.Repositories
{
    public interface IUserRepository : IBaseRepository
    {
        Task<ApplicationUser> GetUserAsync(LoginDetails userDetails);
        Task<IEnumerable<string>> GetUserRoles(ApplicationUser user);
        Task<IEnumerable<User>> GetUsersAsync();
    }
}

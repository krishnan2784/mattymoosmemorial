using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository : ICoreBaseRepository
    {
        Task<IApplicationUser> GetUserAsync(ILoginDetails userDetails);
        Task<IEnumerable<string>> GetUserRoles(IApplicationUser user);
        Task<IEnumerable<IUser>> GetUsersAsync();
        Task<IEnumerable<IUserMarket>> GetUserMarkets(IMarketRepository marketRepo, int userId);
        Task<IEnumerable<IUserConfiguration>> GetUserConfigurationsByUserId(int userId);
    }
}

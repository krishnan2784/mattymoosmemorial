using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository : ICoreBaseRepository
    {
        Task<IApplicationUser> GetUserAsync(ILoginDetails userDetails);
        Task<IEnumerable<string>> GetUserRoles(IApplicationUser user);
        Task<IEnumerable<IMLearningUser>> GetUsersAsync();
        Task<IEnumerable<IUserMarket>> GetUserMarkets(IMarketRepository marketRepo, int userId);
        Task<IEnumerable<IUserConfiguration>> GetUserConfigurationsByUserId(int userId);
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository : ICoreBaseRepository
    {
        Task<Tuple<ApplicationUser, string>> GetUserAsync(ILoginDetails userDetails);
        Task<IEnumerable<string>> GetUserRoles(IApplicationUser user);
        Task<IEnumerable<IMLearningUser>> GetUsersAsync();
        Task<IEnumerable<IUserMarket>> GetUserMarkets(IMarketRepository marketRepo, int userId);
        Task<IEnumerable<IUserConfiguration>> GetUserConfigurationsByUserId(int userId);
    }
}

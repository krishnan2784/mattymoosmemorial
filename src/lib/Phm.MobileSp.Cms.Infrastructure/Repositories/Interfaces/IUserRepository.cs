using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository : ICoreBaseRepository
    {
        Task<dynamic> GetCurrentUser();
        Task<Tuple<ApplicationUser, string>> GetUserAsync(ILoginDetails userDetails);
        Task<IEnumerable<string>> GetUserRoles(IApplicationUser user);
        Task<dynamic> GetUsersAsync(int marketId, int? userId);
        Task<IEnumerable<IUserMarket>> GetUserMarkets(IMarketRepository marketRepo, int userId);
        Task<IEnumerable<IUserConfiguration>> GetUserConfigurationsByUserId(int userId);
        Task<BaseResponse> CreateUserAsync(UserTemplate user);
        Task<BaseResponse> UpdateUserAsync(UserTemplate user);
        Task<BaseResponse> GetSecGroupsAsync(int marketId);
    }
}

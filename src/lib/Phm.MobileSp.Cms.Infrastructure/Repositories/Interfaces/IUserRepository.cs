using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository : IBaseRepository
    {
        Task<dynamic> GetCurrentUser();
        Task<dynamic> GetUsersAsync(int marketId, int? userId);
        Task<IEnumerable<UserMarket>> GetUserMarkets(int userId);
        Task<IEnumerable<UserConfiguration>> GetUserConfigurationsByUserId(int userId);
        Task<BaseResponse> CreateUserAsync(UserTemplate user);
        Task<BaseResponse> UpdateUserAsync(UserTemplate user);
        Task<BaseResponse> GetSecGroupsAsync(int marketId);
    }
}

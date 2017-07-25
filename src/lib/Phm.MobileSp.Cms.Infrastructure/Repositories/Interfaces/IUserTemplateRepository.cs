using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IUserTemplateRepository : IBaseRepository
    {
        Task<dynamic> GetUsersAsync(int marketId, int? userId);
        Task<BaseResponse> CreateUserAsync(UserTemplate user);
        Task<BaseResponse> UpdateUserAsync(UserTemplate user);
    }
}

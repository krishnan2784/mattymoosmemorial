using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ISecurityGroupsRepository
    {
        Task<BaseResponse<dynamic>> GetSecGroupsByMarketAsync(int marketId);
        Task<BaseResponse<dynamic>> GetSecGroupsByIdAsync(int id);
	}
}

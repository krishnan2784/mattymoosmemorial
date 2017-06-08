using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IMarketRepository : ICoreBaseRepository
    {
        Task<IEnumerable<Market>> GetMarketsAsync();
        Task<IEnumerable<Market>> GetMarketsByMasterIdAsync(CopiedElementTypeEnum contentType, Guid masterId);
        Task<BaseResponse> PublishContentToLive(CopiedElementTypeEnum contentType, int id);
    }
}

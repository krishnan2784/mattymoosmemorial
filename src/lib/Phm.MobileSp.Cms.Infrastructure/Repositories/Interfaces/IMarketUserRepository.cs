using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IMarketUserRepository
    {
        Task<dynamic> GetMarketUserFilters(int marketId);
    }
}

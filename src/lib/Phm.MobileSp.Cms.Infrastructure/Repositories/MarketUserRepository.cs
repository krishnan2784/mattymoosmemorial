using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSPCoreService;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using MLearningCoreService;
using Microsoft.Extensions.Options;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class MarketUserRepository : BaseRepository, IMarketUserRepository
    {
        public MarketUserRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "MarketUser")
        {

        }
        public async Task<dynamic> GetMarketUserFilters(int marketId)
        {
            return (await GetAsync<dynamic>(marketId)).Content;
        }
    }
}

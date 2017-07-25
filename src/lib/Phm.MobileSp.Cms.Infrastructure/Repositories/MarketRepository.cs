﻿using System;
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
    public class MarketRepository : BaseRepository, IMarketRepository
    {
        public MarketRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "Markets")
        {

        }

        public async Task<IEnumerable<Market>> GetMarketsAsync()
        {
            return (await GetAsync())?.Content;
        }

        public async Task<IEnumerable<Market>> GetMarketsByMasterIdAsync(CopiedElementTypeEnum contentType, Guid masterId)
        {
            return (await GetAsync("MasterMarket", new {
                ContentType = (CopiedElementTypeEnumDto)contentType,
                MasterId = masterId
            }))?.Content;
        }
       
    }
}

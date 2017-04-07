﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSPCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public class MarketRepository : CoreBaseRepository, IMarketRepository
    {
        private readonly ICoreContract _proxyClient;

        public MarketRepository(ICoreContract proxyClient, IBaseRequest baseRequest, IBaseCriteria baseRBaseCriteria)
            : base(baseRequest, baseRBaseCriteria)
        {
            _proxyClient = proxyClient;
        }

        public async Task<IEnumerable<Market>> GetMarketsAsync()
        {
            try
            {
                var request = GetRequest(new GetMarketRequest
                {
                    Criteria = new MarketCriteriaDto()
                    {
                        IsLive = false
                    }
                });

                var response = await _proxyClient.GetMarketsAsync(request);

                var mapper = new AutoMapperGenericsHelper<MarketDto, Market>();
                var markets = mapper.ConvertToDbEntity(response.Markets);

                return markets;
            }
            catch (Exception e)
            {
                return null;
            }

        }
    }
}

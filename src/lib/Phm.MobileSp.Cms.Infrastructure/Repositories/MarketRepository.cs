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
using Newtonsoft.Json;
using System.Net.Http;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class MarketRepository : BaseRepository, IMarketRepository
    {
        public MarketRepository(IHttpClientService client)
            : base(client, "Markets")
        {

        }

        public async Task<IEnumerable<Market>> GetMarketsAsync()
        {
            var response = await GetAsync();
            return GetResponseModel<IEnumerable<Market>>(response);
        }

        public async Task<IEnumerable<Market>> GetMarketsByMasterIdAsync(CopiedElementTypeEnum contentType, Guid masterId)
        {
            return GetResponseModel<List<Market>>(await GetAsync("MasterMarket", new {
                ContentType = (CopiedElementTypeEnumDto)contentType,
                MasterId = masterId
            }));
        }
       
    }
}

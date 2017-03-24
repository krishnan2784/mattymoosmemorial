using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSPCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public class MarketRepository : BaseRepository, IMarketRepository
    {
        private readonly CoreContractClient _proxy = new CoreContractClient();

        public async Task<IEnumerable<Market>> GetMarketsAsync()
        {
            try
            {
                var response = await _proxy.GetMarketsAsync(new GetMarketRequest()
                {
                    AccessToken = BaseRequest.AccessToken,
                    Criteria = new MarketCriteriaDto()
                    {
                        IsLive = false
                    }
                });

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

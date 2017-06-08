using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSPCoreService;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
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

        public async Task<IEnumerable<Market>> GetMarketsByMasterIdAsync(CopiedElementTypeEnum contentType, Guid masterId)
        {
            try
            {
                var request = GetRequest(new GetMarketsByMasterIdRequest()
                {
                    ContentType = (CopiedElementTypeEnumDto)contentType,
                    MasterId = masterId
                });

                var response = await _proxyClient.GetMarketsByMasterIdAsync(request);

                var mapper = new AutoMapperGenericsHelper<MarketDto, Market>();
                var markets = mapper.ConvertToDbEntity(response.Markets);

                return markets;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<BaseResponse> PublishContentToLive(CopiedElementTypeEnum contentType, int id)
        {
            try
            {
                var request = GetRequest(new PublishContentsRequest
                {
                    ContentType = (CopiedElementTypeEnumDto)contentType,
                    ParentId = id
                });

                var response = await _proxyClient.PublishContentsAsync(request);
                return new BaseResponse(response.Published, 
                    response.Published ? "Item published to live" : "Item could not be published to live", response.Published);
            }
            catch (Exception e)
            {
                return new BaseResponse(false, e.Message, false);
            }
        }
    }
}

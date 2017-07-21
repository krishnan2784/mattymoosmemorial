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
    public class MarketRepository : BaseRepository, IMarketRepository
    {
        public MarketRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "Markets")
        {

        }

        public async Task<IEnumerable<Market>> GetMarketsAsync()
        {
            try
            {
                var request = GetRequest(new GetMarketRequest
                {
                    Criteria = new MarketCriteriaDto()
                });

                var response = await _proxyCoreClient.GetMarketsAsync(request);

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

                var response = await _proxyCoreClient.GetMarketsByMasterIdAsync(request);

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

                var response = await _proxyCoreClient.PublishContentsAsync(request);
                return new BaseResponse(response.Published, 
                    response.Published ? "Item published to live" : "Item could not be published to live", response.Published);
            }
            catch (Exception e)
            {
                return new BaseResponse(false, e.Message, false);
            }
        }

        public async Task<dynamic> GetMarketUserFilters(int marketId)
        {
            var request = new GetMarketUserFiltersRequest() {
                AccessToken = BaseRequest.AccessToken,
                MarketId = marketId
            };
            var response = await _proxyClient.GetMarketUserFiltersAsync(request);
            return response;
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using System.Net.Http;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public abstract class MarketContentRepository : BaseRepository, IMarketContentRepository
    {
	    public CopiedElementTypeEnum ContentType;

	    protected MarketContentRepository(IHttpClientService client, CopiedElementTypeEnum contentType, string baseUrl)
            : base(client, baseUrl)
		{
			this.ContentType = contentType;
		}

	    public async Task<IEnumerable<Market>> GetMarketsById(int id)
	    {
			var r = GetResponseModel<List<Market>>(await GetAsync($"/api/{RepoUrl}/{id}/markets", null));
		    return r;
	    }

		public async Task<BaseResponse<bool>> PublishContentToLive(int id)
        {
            var response = GetResponseModel<bool>(await PostAsync("Content", new
            {
                ContentType,
                ParentId = id
            }));
            return new BaseResponse<bool>(response, response ? "Item published to live" : "Item could not be published to live", response);
        }

	    public async Task<BaseResponse<bool>> CopyToMarket(int id, List<int> marketIds)
	    {
		    var response = true;
		    foreach (var marketId in marketIds)
		    {
			    try
			    {
				    await PostAsync($"/api/{RepoUrl}/{id}/markets/{marketId}", null);
			    }
			    catch
			    {
				    response = false;
				}
		    }
			return new BaseResponse<bool>(response, response ? "Item copied sucessfully" : "Item could not be copied", response);
		}
		
	}
}

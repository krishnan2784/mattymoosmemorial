using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using System.Net.Http;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class ContentRepository : BaseRepository, IContentRepository
    {
        public ContentRepository(IHttpClientService client)
            : base(client, "Content")
        {

        }

        public async Task<BaseResponse<bool>> PublishContentToLive(CopiedElementTypeEnum contentType, int id)
        {
            var response = GetResponseModel<bool>(await PostAsync(new
            {
                ContentType = contentType,
                ParentId = id
            }));
            return new BaseResponse<bool>(response, response ? "Item published to live" : "Item could not be published to live", response);
        }

	    public async Task<BaseResponse<bool>> CopyToMarket(CopiedElementTypeEnum contentType, int id, List<int> marketIds)
	    {
			var response = GetResponseModel<bool>(await PostAsync(new
		    {
			    ContentType = contentType,
			    ParentId = id
		    }));
		    return new BaseResponse<bool>(response, response ? "Item published to live" : "Item could not be published to live", response);
		}

	}
}

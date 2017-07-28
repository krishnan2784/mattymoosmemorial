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
            return GetAPIResponse<bool>(await PostAsync(new
            {
                ContentType = contentType,
                ParentId = id
            }), "Item published to live", "Item could not be published to live");
        }
        
    }
}

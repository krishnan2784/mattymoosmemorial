using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Options;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class MediaInfoRepository : BaseRepository, IMediaInfoRepository
    {
        public MediaInfoRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "MediaInfo") {       }


        public async Task<MediaInfo> CreateMediaInfo(MediaInfo file)
        {
            var response = await CreateAsync(file);
            return response?.Content.First();
        }        

    }
}

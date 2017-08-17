using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IMediaInfoRepository
    {
        Task<MediaInfo> GetMediaInfo(int id);
        Task<MediaInfo> CreateMediaInfo(MediaInfo file);
    }
}

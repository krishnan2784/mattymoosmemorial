using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IContentRepository
    {
        Task<BaseResponse<bool>> PublishContentToLive(CopiedElementTypeEnum contentType, int id);
    }
}

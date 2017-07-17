using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Microsoft.AspNetCore.Http;
using MobileSPCoreService;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IMediaRepository : ICoreBaseRepository
    {
        Task<MediaInfoDto> UploadFile(IFormFile file, Market currentMarket);
    }
}

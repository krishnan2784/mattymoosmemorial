using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Microsoft.AspNetCore.Http;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IMediaRepository : ICoreBaseRepository
    {
        Task<MediaInfo> UploadImage(IFormFile image);
    }
}

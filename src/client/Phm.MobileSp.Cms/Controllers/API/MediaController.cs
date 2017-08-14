using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Controllers.API
{
    [AiHandleError]
    public class MediaController : BaseController
    {
        private readonly IMediaRepository _mediaRepository;
        private readonly IMarketRepository _marketRepository;
        public MediaController(IMediaRepository mediaRepository, IMemoryCache memoryCache, IMarketRepository marketRepository) : base(memoryCache){
            _mediaRepository = mediaRepository;
            _marketRepository = marketRepository;
        }

        [HttpPost]
        public async Task<JsonResult> UploadFile(IFormFile file) {
            var markets = await _marketRepository.GetMarketsAsync();
            var response = await _mediaRepository.UploadFile(file, markets.FirstOrDefault(x => x.Id == CurrentMarketId));
            return Json(new BaseResponse<MediaInfo>(response));
        }

    }
}

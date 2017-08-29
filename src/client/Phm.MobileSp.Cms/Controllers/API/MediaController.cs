using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using ImageSharp;

namespace Phm.MobileSp.Cms.Controllers.API
{
    [AiHandleError]
    public class MediaController : BaseController
    {
        private readonly IMediaRepository _mediaRepository;
        private readonly IMarketRepository _marketRepository;
        private readonly IMediaInfoRepository _mediaInfoRepository;
        public MediaController(IMediaRepository mediaRepository, IMemoryCache memoryCache, IMarketRepository marketRepository, IMediaInfoRepository mediaInfoRepository) : base(memoryCache){
            _mediaRepository = mediaRepository;
            _marketRepository = marketRepository;
            _mediaInfoRepository = mediaInfoRepository;
        }
        
        [HttpGet]
        public async Task<JsonResult> GetMediaInfo(int id)
        {
            var response = await _mediaInfoRepository.GetMediaInfo(id);
            return Json(new BaseResponse<MediaInfo>(response));
        }

        [HttpPost]
        public async Task<JsonResult> UploadFile(IFormFile file)
        {
            var markets = await _marketRepository.GetMarketsAsync();
            var response = await _mediaRepository.UploadFile(file, markets.FirstOrDefault(x => x.Id == CurrentMarketId));
            return Json(new BaseResponse<MediaInfo>(response));
        }

        [HttpPost]
        public async Task<JsonResult> UploadFeedItemIcon(IFormFile file)
        {
            if (file.ContentType != "image/png" && file.ContentType != "image/png" && file.ContentType != "image/png")
                return Json(new BaseResponse<MediaInfo>(false, "Preview images must be in Jpeg or Png format.", new MediaInfo()));

            using (Image temp = new Image(file.OpenReadStream()))
            {
                if (temp.Height != 930 || temp.Width != 1860)
                    return Json(new BaseResponse<MediaInfo>(false, "The uploaded image is not the correct size.", new MediaInfo()));
            }

            var index = file.FileName.LastIndexOf(".", StringComparison.Ordinal);
            var fileName = file.FileName.Remove(index, 1).Insert(index, "@3x.");

            var markets = await _marketRepository.GetMarketsAsync();
            var response = await _mediaRepository.UploadPreviewImage(file, fileName, markets.FirstOrDefault(x => x.Id == CurrentMarketId));
            return Json(new BaseResponse<MediaInfo>(response));
        }

    }
}

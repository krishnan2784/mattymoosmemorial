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
using Phm.MobileSp.Cms.Helpers;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Controllers.API
{
    [AiHandleError]
    public class MediaController : Controller
    {
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);
        }
        private readonly IMediaRepository _mediaRepository;
        public MediaController(IMediaRepository mediaRepository){
            _mediaRepository = mediaRepository;
        }

        //[HttpPost]
        //[DisableFormValueModelBinding]
        //public async Task<JsonResult> UploadFiles()
        //{
        //    FormValueProvider formModel;
        //    using (var stream = System.IO.File.Create("c:\\temp\\myfile.temp"))
        //    {
        //        formModel = await Request.StreamFile(stream);
        //    }

        //    var viewModel = new MediaInfo();

        //    var bindingSuccessful = await TryUpdateModelAsync(viewModel, prefix: "",
        //        valueProvider: formModel);

        //    if (!bindingSuccessful)
        //    {
        //    }
        //    return Json(new BaseResponse(bindingSuccessful, "", viewModel));
        //}

        [HttpPost]
        public async Task<JsonResult> UploadFile(IFormFile file) {
            var response = await _mediaRepository.UploadFile(file);
            return Json(new BaseResponse(response));
        }

    }
}

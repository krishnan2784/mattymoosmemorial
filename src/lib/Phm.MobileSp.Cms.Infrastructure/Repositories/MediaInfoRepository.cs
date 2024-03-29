﻿using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using System.Net.Http;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class MediaInfoRepository : BaseRepository, IMediaInfoRepository
    {
        public MediaInfoRepository(IHttpClientService client): base(client, "MediaInfo") {       }

        public async Task<dynamic> GetMediaInfo(int id)
        {
            var response = await GetAsync(id);
            return GetResponseModel<dynamic>(response);
        }


        public async Task<MediaInfo> CreateMediaInfo(MediaInfo file)
        {
            file.MediaId = file.Name;
            var response = await CreateAsync(file);
            return GetResponseModel<MediaInfo>(response);
        }        

    }
}

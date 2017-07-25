using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSPCoreService;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using MLearningCoreService;
using Microsoft.Extensions.Options;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class ContentRepository : BaseRepository, IContentRepository
    {
        public ContentRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "Content")
        {

        }

        public async Task<BaseResponse> PublishContentToLive(CopiedElementTypeEnum contentType, int id)
        {
            var response = await PostAsync(new
            {
                ContentType = (CopiedElementTypeEnumDto)contentType,
                ParentId = id
            });
            response.Message = response.Success ? "Item published to live" : "Item could not be published to live";
            return response;
        }
        
    }
}

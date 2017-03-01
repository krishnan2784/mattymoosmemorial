using System;
using System.Threading;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Repositories;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public abstract class BaseRepository : IBaseRepository
    {
        public string AuthToken { get; set; }
        public IBaseRequest RequestCriteria { get; set; }

        public TCriteria GetCriteria<TCriteria>(IBaseRequest source) where TCriteria :  MLearningCoreService.BaseCriteriaDto 
        {
            var mapper = new AutoMapperGenericsHelper<IBaseRequest, TCriteria>();
            return mapper.ConvertToDbEntity(source);
        }
    }
}
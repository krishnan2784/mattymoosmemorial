using System;
using System.Threading;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Core.Repositories;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public abstract class BaseRepository : IBaseRepository
    {
        public IBaseRequest BaseRequest { get; set; }

        public IBaseCriteria RequestCriteria { get; set; }

        public TRequestBase GetRequest<TRequestBase>(IBaseRequest source) where TRequestBase : MLearningCoreService.RequestBase
        {
            var mapper = new AutoMapperGenericsHelper<IBaseRequest, TRequestBase>();
            return mapper.ConvertToDbEntity(source);
        }

        public TCriteria GetCriteria<TCriteria>(IBaseCriteria source) where TCriteria : MLearningCoreService.BaseCriteriaDto
        {
            var mapper = new AutoMapperGenericsHelper<IBaseCriteria, TCriteria>();
            return mapper.ConvertToDbEntity(source);
        }
    }
}
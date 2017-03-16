using System;
using System.Threading;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public abstract class BaseRepository : IBaseRepository
    {
        public IBaseRequest BaseRequest { get; set; }

        public IBaseCriteria RequestCriteria { get; set; }

        public TRequestBase GetRequest<TRequestBase>(TRequestBase request) where TRequestBase : MLearningCoreService.RequestBase
        {
            var mapper = new AutoMapperGenericsHelper<IBaseRequest, TRequestBase>();
            request = mapper.ConvertUnpopulatedFields(BaseRequest, request);
            return request;
        }

       
        public TCriteria GetCriteria<TCriteria>(TCriteria destinationCriteria) where TCriteria : MLearningCoreService.BaseCriteriaDto
        {
            var mapper = new AutoMapperGenericsHelper<IBaseCriteria, TCriteria>();
            destinationCriteria = mapper.ConvertUnpopulatedFields(RequestCriteria, destinationCriteria);
            return destinationCriteria;
        }
    }
}
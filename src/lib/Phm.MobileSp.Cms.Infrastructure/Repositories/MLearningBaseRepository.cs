using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public abstract class MLearningBaseRepository : BaseRepository, IMLearningBaseRepository
    {
        private new IBaseRequest BaseRequest => base.BaseRequest;
        private new IBaseCriteria BaseRequestCriteria => base.BaseRequestCriteria;

        protected MLearningBaseRepository(IBaseRequest baseRequest, IBaseCriteria baseCriteria) :base(baseRequest, baseCriteria)
        {
        }

        public TRequestBase GetRequest<TRequestBase>(TRequestBase request) where TRequestBase : MLearningCoreService.RequestBase
        {
            var mapper = new AutoMapperGenericsHelper<IBaseRequest, TRequestBase>();
            request = mapper.ConvertUnpopulatedFields(BaseRequest, request);
            return request;
        }
       
        public TCriteria GetCriteria<TCriteria>(TCriteria destinationCriteria) where TCriteria : MLearningCoreService.BaseCriteriaDto
        {
            var mapper = new AutoMapperGenericsHelper<IBaseCriteria, TCriteria>();
            destinationCriteria = mapper.ConvertUnpopulatedFields(BaseRequestCriteria, destinationCriteria);
            return destinationCriteria;
        }
    }
}
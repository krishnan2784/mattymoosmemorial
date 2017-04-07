using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public abstract class CoreBaseRepository : BaseRepository, ICoreBaseRepository
    {
        private new IBaseRequest BaseRequest => base.BaseRequest;
        private new IBaseCriteria BaseRequestCriteria => base.BaseRequestCriteria;

        protected CoreBaseRepository(IBaseRequest baseRequest, IBaseCriteria baseRBaseCriteria) : base(baseRequest, baseRBaseCriteria)
        {
        }

        public TRequestBase GetRequest<TRequestBase>(TRequestBase request) where TRequestBase : MobileSPCoreService.RequestBase
        {
            var mapper = new AutoMapperGenericsHelper<IBaseRequest, TRequestBase>();
            request = mapper.ConvertUnpopulatedFields(BaseRequest, request);
            return request;
        }
       
        public TCriteria GetCriteria<TCriteria>(TCriteria destinationCriteria) where TCriteria : MobileSPCoreService.BaseCriteriaDto
        {
            var mapper = new AutoMapperGenericsHelper<IBaseCriteria, TCriteria>();
            destinationCriteria = mapper.ConvertUnpopulatedFields(BaseRequestCriteria, destinationCriteria);
            return destinationCriteria;
        }
    }
}
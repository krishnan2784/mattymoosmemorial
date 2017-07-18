﻿using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public abstract class CoreBaseRepository : ICoreBaseRepository
    {
        public IBaseRepository _baseRepo { get; set; }
        public IBaseRequest BaseRequest => _baseRepo.BaseRequest;
        public IBaseCriteria BaseRequestCriteria => _baseRepo.BaseRequestCriteria;

        protected CoreBaseRepository(IBaseRepository baseRepo)
        {
            _baseRepo = baseRepo;
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
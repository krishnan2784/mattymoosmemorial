﻿namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IMLearningBaseRepository : IBaseRepository
    {
        TRequestBase GetRequest<TRequestBase>(TRequestBase request)
            where TRequestBase : MLearningCoreService.RequestBase;

        TCriteria GetCriteria<TCriteria>(TCriteria destinationCriteria)
            where TCriteria : MLearningCoreService.BaseCriteriaDto;
     }
}
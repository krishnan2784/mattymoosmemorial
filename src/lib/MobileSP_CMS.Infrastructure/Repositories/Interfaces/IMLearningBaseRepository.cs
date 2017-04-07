namespace MobileSP_CMS.Infrastructure.Repositories.Interfaces
{
    public interface IMLearningBaseRepository : IBaseRepository
    {
        TRequestBase GetRequest<TRequestBase>(TRequestBase request)
            where TRequestBase : MLearningCoreService.RequestBase;

        TCriteria GetCriteria<TCriteria>(TCriteria destinationCriteria)
            where TCriteria : MLearningCoreService.BaseCriteriaDto;
     }
}
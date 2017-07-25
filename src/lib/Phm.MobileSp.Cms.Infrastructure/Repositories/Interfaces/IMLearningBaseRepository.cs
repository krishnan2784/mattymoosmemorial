namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IMLearningBaseRepository
    {
        IBaseRepository _baseRepo { get; set; }

        TRequestBase GetRequest<TRequestBase>(TRequestBase request)
            where TRequestBase : MLearningCoreService.RequestBase;

        TCriteria GetCriteria<TCriteria>(TCriteria destinationCriteria)
            where TCriteria : MLearningCoreService.BaseCriteriaDto;
     }
}
namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ICoreBaseRepository : IBaseRepository
    {
        TRequestBase GetRequest<TRequestBase>(TRequestBase request)
            where TRequestBase : MobileSPCoreService.RequestBase;

        TCriteria GetCriteria<TCriteria>(TCriteria destinationCriteria)
            where TCriteria : MobileSPCoreService.BaseCriteriaDto;
    }
}
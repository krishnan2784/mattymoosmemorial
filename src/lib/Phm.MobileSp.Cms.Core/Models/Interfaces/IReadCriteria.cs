namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface IReadCriteria : IBaseCriteria
    {
        string OrderBy {get; set;}
        int PageNumber {get; set;}
        int PageSize {get; set;}
    }
}

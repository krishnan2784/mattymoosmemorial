namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface IBaseCriteria
    {

        int? Id { get; set; }
        int? MarketId { get; set; }
        bool? Deleted {get; set;}
        bool? Enabled {get; set;}
        bool? Published {get; set;}
        bool? ValidVersion {get; set;}
        int? Version {get; set;}
    }
}

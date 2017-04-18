using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface IBaseFeed : IBaseModel
    {
        FeedCategoryEnum FeedCategory { get; set; }
        FeedTypeEnum FeedType { get; set; }
        MediaInfo MainIcon { get; set; }
        int? MarketId { get; set; }
        int? Points { get; set; }
        string Title { get; set; }
    }
}

using MobileSP_CMS.Core.Enumerations;

namespace MobileSP_CMS.Core.Models.Interfaces
{
    public interface IBaseFeed : IBaseModel
    {
        FeedCategoryEnum FeedCategory { get; set; }
        FeedTypeEnum FeedType { get; set; }
        MediaInfo MainIcon { get; set; }
        int MarketId { get; set; }
        int Points { get; set; }
        string Title { get; set; }
    }
}

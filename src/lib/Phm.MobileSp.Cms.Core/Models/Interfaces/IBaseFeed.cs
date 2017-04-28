using System;
using MobileSP_CMS.Core.Enumerations;

namespace MobileSP_CMS.Core.Models.Interfaces
{
    public interface IBaseFeed : IBaseModel
    {
        FeedCategoryEnum FeedCategory { get; set; }
        FeedTypeEnum FeedType { get; set; }
        MediaInfo MainIcon { get; set; }
        int? MarketId { get; set; }
        int? Points { get; set; }
        string Title { get; set; }
         bool AllowFavourite { get; set; }
         CorporateApp CorporateApp { get; set; }
         string LegalInformation { get; set; }
         bool? MakeTitleWidgetLink { get; set; }
         long? Permissions { get; set; }
         int? ReadingTime { get; set; }
         DateTime? StartDate { get; set; }
         DateTime? EndDate { get; set; }
    }
}

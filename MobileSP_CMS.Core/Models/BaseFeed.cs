using System;
using System.Runtime.Serialization;
using MobileSP_CMS.Core.Enumerations;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Models
{
    [KnownTypeAttribute(typeof(ImageFeed))]
    [KnownTypeAttribute(typeof(TextFeed))]
    [KnownTypeAttribute(typeof(VideoFeed))]
    [KnownTypeAttribute(typeof(QuizFeed))]
    [KnownTypeAttribute(typeof(SurveyFeed))]
    [KnownTypeAttribute(typeof(CampaignFeed))]
    public class BaseFeed : BaseModel, IBaseFeed
    {
        public virtual FeedCategoryEnum FeedCategory { get; set; }
        public virtual FeedTypeEnum FeedType { get; set; }
        public virtual int? MainIconId { get; set; }
        public virtual MediaInfo MainIcon { get; set; }
        public virtual int? MarketId { get; set; }
        public virtual int? Points { get; set; }
        public virtual string Title { get; set; }
        public virtual bool AllowFavourite { get; set; }
        public virtual CorporateApp CorporateApp { get; set; }
        public virtual string LegalInformation { get; set; }
        public virtual bool MakeTitleWidgetLink { get; set; }
        public virtual long Permissions { get; set; }
        
    }
}
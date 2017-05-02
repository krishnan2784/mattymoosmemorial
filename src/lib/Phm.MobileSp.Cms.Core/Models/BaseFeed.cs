using System;
using System.Runtime.Serialization;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    [KnownType(typeof(ImageFeed))]
    [KnownType(typeof(TextFeed))]
    [KnownType(typeof(VideoFeed))]
    [KnownType(typeof(QuizFeed))]
    [KnownType(typeof(SurveyFeed))]
    [KnownType(typeof(CampaignFeed))]
    public class BaseFeed : BaseModel, IBaseFeed
    {
        public virtual FeedCategoryEnum FeedCategory { get; set; }
        public virtual FeedTypeEnum FeedType { get; set; }
        public virtual int? MainIconId { get; set; }
        public virtual MediaInfo MainIcon { get; set; }
        public virtual int? MarketId { get; set; }
        public virtual int? Points { get; set; }
        public virtual string Title { get; set; }
        public virtual string ShortDescription { get; set; }
        public virtual bool AllowFavourite { get; set; }
        public virtual CorporateApp CorporateApp { get; set; }
        public virtual string LegalInformation { get; set; }
        public virtual bool MakeTitleWidgetLink { get; set; }
        public virtual long Permissions { get; set; }
        public virtual int ReadingTime { get; set; }
        public virtual DateTime StartDate { get; set; }
        public virtual DateTime EndDate { get; set; }
    }
}
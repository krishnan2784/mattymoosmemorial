using System;
using MobileSP_CMS.Core.Enumerations;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Models
{
    public class BaseFeed : IBaseFeed
    {
        public virtual DateTime? CreatedAt { get; set; }
        public virtual DateTime? DeletedAt { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual FeedCategoryEnum? FeedCategory { get; set; }
        public virtual FeedTypeEnum? FeedType { get; set; }
        public virtual int Id { get; set; }
        public virtual MediaInfo MainIcon { get; set; }
        public virtual int? MarketId { get; set; }
        public virtual Guid? MasterId { get; set; }
        public virtual int? Points { get; set; }
        public virtual bool Published { get; set; }
        public virtual string Title { get; set; }
        public virtual DateTime? UpdatedAt { get; set; }
    }
}
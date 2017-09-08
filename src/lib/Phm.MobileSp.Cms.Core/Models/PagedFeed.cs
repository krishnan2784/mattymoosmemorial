using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class PagedFeed : BaseFeed
    {
        public PagedFeed() : base() => FeedType = FeedTypeEnum.Paged;
        public List<BaseFeedPage> BaseFeedPages { get; set; }
    }
}
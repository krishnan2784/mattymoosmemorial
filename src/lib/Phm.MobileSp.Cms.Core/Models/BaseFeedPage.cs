using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class BaseFeedPage : BaseModel
    {        
        public int PagedFeedId { get; set; }
        public BasePageFeedTypeEnum BasePageFeedType { get; set; }
        public int PageNumber { get; set; }
        public string Title { get; set; }
    }
}
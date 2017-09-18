using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class MediaFeedPage: BaseFeedPage
    {
        public MediaFeedPage():base()
        {
            this.BasePageFeedType = BasePageFeedTypeEnum.Media;
        }

        public MediaInfo MediaInfo { get; set; }
        public int MediaInfoId { get; set; }
    }
}
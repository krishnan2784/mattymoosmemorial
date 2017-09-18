using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class MediaTabbedTextFeedPage: BaseFeedPage
    {
        public MediaTabbedTextFeedPage():base()
        {
            this.BasePageFeedType = BasePageFeedTypeEnum.MediaTabbedText;
        }

        public MediaInfo MediaInfo { get; set; }
        public int MediaInfoId { get; set; }
        public virtual ICollection<TabText> Tabs { get; set; }

    }
}
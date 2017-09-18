using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class MediaTextFeedPage: BaseFeedPage
    {
        public MediaTextFeedPage():base()
        {
            this.BasePageFeedType = BasePageFeedTypeEnum.MediaText;
        }

        public MediaInfo MediaInfo { get; set; }
        public int MediaInfoId { get; set; }
        public string BodyText { get; set; }
    }
}
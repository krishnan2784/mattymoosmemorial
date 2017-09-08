using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class TabText: BaseModel
    {
        public int MediaTabbedTextFeedPageId { get; set; }
        public string Title { get; set; }
        public string BodyText { get; set; }
        public int Order { get; set; }
    }
}
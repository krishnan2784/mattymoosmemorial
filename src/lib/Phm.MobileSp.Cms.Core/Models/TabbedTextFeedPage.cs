using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class TabbedTextFeedPage: BaseFeedPage
    {
        public TabbedTextFeedPage():base()
        {
            this.BasePageFeedType = BasePageFeedTypeEnum.TabbedText;
        }
        public virtual ICollection<TabText> Tabs { get; set; }
    }
}
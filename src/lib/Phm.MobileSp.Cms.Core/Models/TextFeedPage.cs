using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class TextFeedPage : BaseFeedPage
    {
        public TextFeedPage() :base()
        {
            this.BasePageFeedType = BasePageFeedTypeEnum.Text;
        }

        public string BodyText { get; set; }
    }
}
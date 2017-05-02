namespace Phm.MobileSp.Cms.Core.Models
{
    public class VideoFeed : BaseFeed
    {
        public virtual MediaInfo MainVideo { get; set; }
        public virtual string VideoDescription { get; set; }
    }
}

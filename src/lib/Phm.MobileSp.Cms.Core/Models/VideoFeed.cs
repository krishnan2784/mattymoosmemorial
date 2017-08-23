namespace Phm.MobileSp.Cms.Core.Models
{
    public class VideoFeed : BaseFeed // TextFeed
    {
        public virtual MediaInfo MainVideo { get; set; }
        public virtual string VideoDescription { get; set; }
        public virtual int MainVideoId { get; set; }

    }
}

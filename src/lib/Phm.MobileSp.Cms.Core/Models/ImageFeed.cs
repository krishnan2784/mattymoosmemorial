namespace Phm.MobileSp.Cms.Core.Models
{
    public class ImageFeed : BaseFeed // TextFeed
    {
        public virtual string ImageDescription { get; set; }
        public virtual MediaInfo MainImage { get; set; }
        public virtual int MainImageId { get; set; }
    }
}

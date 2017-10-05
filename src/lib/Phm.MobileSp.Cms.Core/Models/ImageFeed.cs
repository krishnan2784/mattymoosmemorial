namespace Phm.MobileSp.Cms.Core.Models
{
    public class ImageFeed : BaseFeed
    {
        public virtual string ImageDescription { get; set; }
        public virtual MediaInfo MainImage { get; set; }
        public virtual int MainImageId { get; set; }
        public string BodyText { get; set; }
  }
}

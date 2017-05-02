namespace Phm.MobileSp.Cms.Core.Models
{
    public class BaseVersionableEntity : BaseModel
    {
        public virtual bool IsPublishedLive { get; set; }
        public virtual bool ValidVersion { get; set; }
        public virtual int Version { get; set; }
    }
}
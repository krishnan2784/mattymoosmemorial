namespace Phm.MobileSp.Cms.Core.Models
{
    public class Market: BaseVersionableEntity
    {
        public virtual int BrandId { get; set; }
        public virtual string Code { get; set; }
        public virtual int DefaultLanguageId { get; set; }
        public virtual bool? IsLive { get; set; }
        public virtual bool IsMaster { get; set; }
        public virtual string Name { get; set; }
        public virtual bool UseMetricSystem { get; set; }
    }
    
}

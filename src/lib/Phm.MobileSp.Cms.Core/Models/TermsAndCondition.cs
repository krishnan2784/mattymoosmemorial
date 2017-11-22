namespace Phm.MobileSp.Cms.Core.Models
{
    public class TermsAndCondition: BaseModel
    {
        public string Title { get; set; }
        public string FullDescription { get; set; }
        public int MarketId { get; set; }
        public Market Market { get; set; }
    }
}

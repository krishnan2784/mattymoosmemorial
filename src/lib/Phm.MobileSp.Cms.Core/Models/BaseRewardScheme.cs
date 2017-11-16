namespace Phm.MobileSp.Cms.Core.Models
{
    // this will be a TPH structure (Table per hierarchy) 1 table for all the children and parent object,easier to maintain
    public class BaseRewardScheme: BaseModel
    {
        public string Title { get; set; }
        public string About { get; set; }
        public int MarketId { get; set; }
        public Market Market { get; set; }
    }
}

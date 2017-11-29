namespace Phm.MobileSp.Cms.Core.Models
{
    public class PositionXBoosterItem: BasicBaseModel
	{
        public PositionXBoosterRewardScheme PositionXBoosterRewardScheme { get; set; }
        public int PositionXBoosterRewardSchemeId { get; set; }
        public int StartPosition { get; set; }
        public int EndPosition { get; set; }
        public decimal XBooster { get; set; }
    }
}

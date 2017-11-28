using System;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class Competition: BaseModel
    {
        public int SecEntityId { get; set; }
        public SecEntity SecEntity { get; set; }

        public int MarketId { get; set; }
        public Market Market { get; set; }

        public int BaseRewardSchemeId { get; set; }
        public BaseRewardScheme BaseRewardScheme { get; set; }

        public int TermsAndConditionId { get; set; }
        public TermsAndCondition TermsAndCondition { get; set; }

        public string Title { get; set; }
        public string About { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? MainImageId { get; set; }
        public MediaInfo MainImage { get; set; }
        public bool MakeImageLink { get; set; }
        public string LinkTitle { get; set; }    
        public string LinkUrl { get; set; }
        public MediaInfo ActiveImage { get; set; }
        public int? ActiveImageId { get; set; }
        public bool MakeActiveImageLink { get; set; }
        public MediaInfo CompletedImage { get; set; }
        public int? CompletedImageId { get; set; }
        public bool MakeCompletedImageLink { get; set; }
	    public int Participants { get; set; }
	}

	public class ActiveCompetition : BaseModel
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public DateTime? StartDate { get; set; }
		public DateTime? EndDate { get; set; }
		public int Participants { get; set; }
	}
}

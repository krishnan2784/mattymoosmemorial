using System;

namespace Phm.MobileSp.Cms.Core.Models
{
	public class CompetitionSubset : BaseModel
	{
		public int BaseRewardSchemeId { get; set; }
		public int TermsAndConditionId { get; set; }
		public string Title { get; set; }
		public DateTime? StartDate { get; set; }
		public DateTime? EndDate { get; set; }
		public int Participants { get; set; }
	}
}

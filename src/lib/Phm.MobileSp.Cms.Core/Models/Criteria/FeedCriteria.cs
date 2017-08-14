using Phm.MobileSp.Cms.Core.Enumerations;
using System;
using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models.Criteria
{
    public class FeedCriteria : BaseCriteriaModel
    {
        public FeedCriteria():base()
        {

        }
        public int? Id { get; set; }

        public DateTime? Day { get; set; }

        public int? MarketId { get; set; }

        public int? ParentId { get; set; }

        public bool? IsFavourite { get; set; }

        public List<FeedCategoryEnum> FeedCategories { get; set; }

        public List<FeedTypeEnum> FeedTypes { get; set; }

        public DateTime? LastUpdate { get; set; }

        public bool? IsCompleted { get; set; }
    }
}
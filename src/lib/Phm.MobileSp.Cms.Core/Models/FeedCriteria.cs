using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class FeedCriteria : BaseCriteria
    {
        public FeedCriteria():base()
        {

        }

        public DateTime? Day { get; set; }
        
        public int? ParentId { get; set; }

        public bool? IsFavourite { get; set; }

        public List<FeedCategoryEnum> FeedCategories { get; set; }

        public List<FeedTypeEnum> FeedTypes { get; set; }

        public DateTime? LastUpdate { get; set; }

        public bool? IsCompleted { get; set; }
    }
}

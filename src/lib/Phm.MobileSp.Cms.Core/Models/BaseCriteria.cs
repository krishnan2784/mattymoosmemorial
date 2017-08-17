using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class BaseCriteria : IBaseCriteria
    {
        public virtual int? Id { get; set; }
        public virtual int? MarketId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string OrderBy { get; set; }
        public bool? Enabled { get; set; }
        public bool? Published { get; set; }
        public bool? Deleted { get; set; }
        public Guid? MasterId { get; set; }
        public bool? ValidVersion { get; set; }
        public int? Version { get; set; }
    }
}

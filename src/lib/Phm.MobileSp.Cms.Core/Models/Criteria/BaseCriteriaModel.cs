using System;
using System.Collections.Generic;
using System.Text;

namespace Phm.MobileSp.Cms.Core.Models.Criteria
{
    public class BaseCriteriaModel 
    {
        public BaseCriteriaModel() { }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public string OrderBy { get; set; }
        
    }
}

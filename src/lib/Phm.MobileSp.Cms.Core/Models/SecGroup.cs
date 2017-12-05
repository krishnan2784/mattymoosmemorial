using System;
using System.Collections.Generic;
using System.Text;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class SecGroup
    {
	    public int Id { get; set; }
	    public DateTime CreatedAt { get; set; }
	    public DateTime UpdatedAt { get; set; }

		public string Name { get; set; }
	    public string Description { get; set; }
	    public int MaxUserCount { get; set; }
	    public bool IsBuiltIn { get; set; }
	    public int? SecEntityId { get; set; }
	}
}

using System;
using System.Collections.Generic;
using System.Text;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class SecFeaturePermission
	{
		public int Id { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }
		public int SecEntityId { get; set; }
		public int SecFeatureId { get; set; }
		public bool Allow { get; set; }
	}
}

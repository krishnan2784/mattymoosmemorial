using System;
using System.Collections.Generic;
using System.Text;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class SecFeature
	{
		public int Id { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }
		public int Code { get; set; }
		public string Uri { get; set; }
		public string HttpVerb { get; set; }
		public int BitMaskValue { get; set; }
		public SecFeatureTypeEnum SecFeatureType { get; set; }

	}
}

using System;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
	public class SecUserFeaturePermission
	{
		public int Id { get; set; }

		public int UserId { get; set; }

		public bool Allow { get; set; }

		public Int64 FeatureBitmask { get; set; }

		public string FeatureUri { get; set; }

		public string FeatureHttpVerb { get; set; }

		public SecFeatureTypeEnum SecFeatureType { get; set; }
	}
}

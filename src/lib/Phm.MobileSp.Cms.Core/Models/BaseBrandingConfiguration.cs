using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models
{
  public class BaseBrandingConfiguration:BaseModel
    {
        public int BrandId { get; set; }

        public int Version { get; set; }

        public List<BrandingElement> BrandingElements { get; set; }
    }
}

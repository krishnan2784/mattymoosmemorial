using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
  public class BrandingElement : BaseModel
    {
        public string Key { get; set; }

        public string Value { get; set; }

        public int Order { get; set; }

        public string GroupName { get; set; }

        public BrandingElementTypeEnum BrandingElementType { get; set; }

        public MediaInfo PrimaryImage { get; set; }

        public MediaInfo SecondaryImage { get; set; }
    }
}

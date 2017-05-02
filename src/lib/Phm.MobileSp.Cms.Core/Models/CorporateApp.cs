using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class CorporateApp : BaseModel
    {
        public virtual AppTypeEnum AppType { get; set; }
        public virtual string LinkUrl { get; set; }
    }
}

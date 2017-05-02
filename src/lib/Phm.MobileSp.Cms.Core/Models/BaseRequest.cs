using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class BaseRequest : IBaseRequest
    {
        public virtual string AccessToken{ get; set; }
        public virtual string CurrentCulture { get; set; }
        public virtual string CurrentUiCulture { get; set; }
    }
}

namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public class BaseRequest : IBaseRequest
    {
        public virtual string AccessToken{ get; set; }
        public virtual string CurrentCulture { get; set; }
        public virtual string CurrentUICulture { get; set; }
    }
}

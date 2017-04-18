namespace MobileSP_CMS.Core.Models
{
    public class BaseResponse
    {
        public virtual bool Success{ get; set; }
        public virtual string Message { get; set; }
        public virtual dynamic Content { get; set; }
    }
}

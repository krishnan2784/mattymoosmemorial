namespace Phm.MobileSp.Cms.Core.Models
{
    public class BaseResponse
    {
        public BaseResponse(bool success = false, string message = "", dynamic content = null)
        {
            // we should be pulling these messages from a resource file, the string passed in should be the key.
            Success = success;
            Message = message;
            Content = content;
        }
        public virtual bool Success{ get; set; }
        public virtual string Message { get; set; }
        public virtual dynamic Content { get; set; }
    }
}

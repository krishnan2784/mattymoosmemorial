using System;

namespace Phm.MobileSp.Cms.Core.Models
{
    public interface IBaseResponse
    {
        bool Success { get; set; }
        string Message { get; set; }
    }

    public class BaseResponse<T> : IBaseResponse
    {
        public BaseResponse() { }

        public BaseResponse(bool success, string message, T content = default(T))
        {
            // we should be pulling these messages from a resource file, the string passed in should be the key.
            Success = success;
            Message = message;
            Content = content;
        }

        public BaseResponse(T content)
        {
            Success = true;
            Message = "";
            Content = content;
        }

        public virtual bool Success { get; set; }
        public virtual string Message { get; set; }
        public virtual T Content { get; set; }
    }


    public class BaseRepoResponse
    {
        public BaseRepoResponse(bool success = false, string message = "", string stringifiedObject = "")
        {
            Success = success;
            Message = message;
            StringifiedObject = stringifiedObject;
        }
        public BaseRepoResponse(string stringifiedObject)
        {
            Success = true;
            Message = "";
            StringifiedObject = stringifiedObject;
        }

        public virtual bool Success { get; set; }
        public virtual string Message { get; set; }
        public virtual string StringifiedObject { get; set; }
    }
}

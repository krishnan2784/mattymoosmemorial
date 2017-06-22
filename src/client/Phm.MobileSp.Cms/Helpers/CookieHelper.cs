using System;
using Microsoft.AspNetCore.Http;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Helpers
{
    public static class CookieHelper
    {

        public static void StoreLoginDetails(HttpContext context, LoginDetails loginDetails)
        {
            CookieOptions options = new CookieOptions();
            if (loginDetails.RememberMe)
            {
                options.Expires = DateTime.Now.AddDays(30);
            }
            else
            {
                options.Expires = DateTime.Now.AddDays(-1);
            }
            context.Response.Cookies.Append("RememberMe", loginDetails.RememberMe.ToString(), options);
            context.Response.Cookies.Append("UserName", loginDetails.UserName, options);
            context.Response.Cookies.Append("Password", loginDetails.Password.EncryptString(""), options);
        }


        public static LoginDetails GetLoginDetails(HttpContext context)
        {
            var loginDetails = new LoginDetails();
            var rememberMeString = string.Empty;
            if (context.Request.Cookies.TryGetValue("RememberMe", out rememberMeString))
            {
                loginDetails.RememberMe = Convert.ToBoolean(rememberMeString);
                var username = string.Empty;
                var password = string.Empty;
                context.Request.Cookies.TryGetValue("UserName", out username);
                context.Request.Cookies.TryGetValue("Password", out password);
                loginDetails.UserName = username;
                loginDetails.Password = password.DecryptString("");
            }
            return loginDetails;
        }
    }
}

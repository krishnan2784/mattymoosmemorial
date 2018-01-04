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
            if (context.Request.Cookies.TryGetValue("RememberMe", out var rememberMeString))
              {
                  loginDetails.RememberMe = Convert.ToBoolean(rememberMeString);
                  context.Request.Cookies.TryGetValue("UserName", out var username);
                  context.Request.Cookies.TryGetValue("Password", out var password);
                  loginDetails.UserName = username;
                  loginDetails.Password = password.DecryptString("");
              }
              return loginDetails;
        }
    }
}

using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Authentication;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Helpers
{
    public static class UserClaimsHelper
    {
	    public static async void AddUpdateClaim(this HttpContext context, string key, string value)
	    {
		    if (!(context.User.Identity is ClaimsIdentity identity))
			    return;

		    // check for existing claim and remove it
		    var existingClaim = identity.FindFirst(key);
		    if (existingClaim != null)
			    identity.RemoveClaim(existingClaim);

			// add new claim
			identity.AddClaim(new Claim(key, value));
		    await context.Authentication.SignOutAsync("MobileSPAuthCookie");
		    await context.Authentication.SignInAsync("MobileSPAuthCookie", context.User);
		}

		public static T GetClaimValue<T>(this HttpContext context, string key)
	    {
		    var u = context?.User;
		    var c = u?.Claims.FirstOrDefault(x => x.Type == key);
		    if (c == null)
			    goto invalid;
		    try
		    {
			    var v = (T)Convert.ChangeType(c.Value, typeof(T));
			    return v;
		    }
		    catch 
		    {
			    // ignored
		    }
		    invalid:
		    return default(T);
	    }
	}
}

using System.Collections.Generic;
using MobileSP_CMS.Core.Interfaces.Models;

namespace MobileSP_CMS.Core.Models
{
    public class ApplicationUser : IApplicationUser
    {
        public bool ValidUser => SessionGuid != null;
        public string SessionGuid { get; set; }
        public IUser UserDetails { get; set; }
        public IEnumerable<string> UserRoles { get; set; }
    }
}
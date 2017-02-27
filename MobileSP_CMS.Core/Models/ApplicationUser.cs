using System.Collections.Generic;
using MobileSP_CMS.Core.Interfaces.Models;

namespace MobileSP_CMS.Core.Models
{
    public class ApplicationUser
    {
        public bool ValidUser => SessionGuid != null;
        public string SessionGuid { get; set; }
        public User UserDetails { get; set; }
        public IEnumerable<string> UserRoles { get; set; }
    }
}
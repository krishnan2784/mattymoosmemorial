using System.Collections.Generic;

namespace MobileSP_CMS.Core.Models
{
    public class ApplicationUser
    {
        public bool ValidUser => SessionGuid != null;
        public string SessionGuid { get; set; }
        public User UserDetails { get; set; }
        public IEnumerable<string> UserRoles { get; set; }
        public IEnumerable<UserConfiguration> UserConfigurations { get; set; }
    }
}
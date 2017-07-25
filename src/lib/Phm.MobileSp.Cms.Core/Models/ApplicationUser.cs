using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class ApplicationUser
    {
        public bool ValidUser => SessionGuid != null;
        public string SessionGuid { get; set; }
        public int UserId { get; set; }
        public MLearningUser UserDetails { get; set; }
        public IEnumerable<string> UserRoles { get; set; }
        public IEnumerable<UserConfiguration> UserConfigurations { get; set; }
    }
}
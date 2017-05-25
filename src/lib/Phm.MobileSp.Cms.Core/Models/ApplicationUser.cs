using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class ApplicationUser : IApplicationUser
    {
        public bool ValidUser => SessionGuid != null;
        public string SessionGuid { get; set; }
        public IMLearningUser UserDetails { get; set; }
        public IEnumerable<string> UserRoles { get; set; }
        public IEnumerable<IUserConfiguration> UserConfigurations { get; set; }
    }
}
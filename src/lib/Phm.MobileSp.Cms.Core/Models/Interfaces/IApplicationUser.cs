using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface IApplicationUser
    {
        bool ValidUser { get; }
        string SessionGuid { get; set; }
        IUser UserDetails { get; set; }
        IEnumerable<string> UserRoles { get; set; }
        IEnumerable<IUserConfiguration> UserConfigurations { get; set; }
    }
}
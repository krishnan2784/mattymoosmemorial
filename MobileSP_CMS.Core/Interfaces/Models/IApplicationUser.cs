using System.Collections.Generic;

namespace MobileSP_CMS.Core.Interfaces.Models
{
    public interface IApplicationUser
    {
        bool ValidUser { get; }
        string SessionGuid { get; set; }
        IUser UserDetails { get; set; }
        IEnumerable<string> UserRoles { get; set; }
    }
}

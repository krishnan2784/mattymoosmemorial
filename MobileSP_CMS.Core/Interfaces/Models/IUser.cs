using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Interfaces.Models
{
    public interface IUser
    {
         bool IsSelected { get; set; }

         string DealershipCode { get; set; }

         string DealershipName { get; set; }

         string Email { get; set; }

         string FirstName { get; set; }

         bool IsBuiltIn { get; set; }

         string LastName { get; set; }

         string Password { get; set; }

         int SessionExpireMinutes { get; set; }

         string UserName { get; set; }

         List<IUserConfiguration> UserConfigurationList { get; set; }

         string UserConfigurationJson { get; set; }
    }
}

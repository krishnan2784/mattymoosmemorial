using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Interfaces.Models;

namespace MobileSP_CMS.Core.Models
{
    public class User : IUser
    {
        public bool IsSelected { get; set; }

        public string DealershipCode { get; set; }

        public string DealershipName { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public bool IsBuiltIn { get; set; }

        public string LastName { get; set; }
        
        public string Password { get; set; }

        public int SessionExpireMinutes { get; set; }

        public string UserName { get; set; }

        public List<IUserConfiguration> UserConfigurationList { get; set; }
        
        public string UserConfigurationJson { get; set; }
    }
}

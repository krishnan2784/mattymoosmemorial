using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class User : IUser 
    {
        public int Id { get; set; }

        public int DefaultMarketId { get; set; }

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

        public List<UserConfiguration> UserConfigurationList { get; set; }
        
        public string UserConfigurationJson { get; set; }
    }
}

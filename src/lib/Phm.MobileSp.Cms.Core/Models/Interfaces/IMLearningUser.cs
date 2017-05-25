using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface IMLearningUser 
    {
         int Id { get; set; }

         int DefaultMarketId { get; set; }
        
         string DealershipCode { get; set; }

         string DealershipName { get; set; }

         string Email { get; set; }

         string FirstName { get; set; }

         bool IsBuiltIn { get; set; }

         string LastName { get; set; }
        
         string Password { get; set; }

         int SessionExpireMinutes { get; set; }

         string UserName { get; set; }

         List<UserConfiguration> UserConfigurationList { get; set; }
        
         string UserConfigurationJson { get; set; }
    }
}

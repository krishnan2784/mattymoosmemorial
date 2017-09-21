using System;
using System.Collections.Generic;
using System.Text;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class User : BaseModel
    {
        public string DealershipCode { get; set; }

        public string DealershipName { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public bool IsBuiltIn { get; set; }

        public string LastName { get; set; }

        public int? SecEntityId { get; set; }

        public int SessionExpireMinutes { get; set; }

        public string UserName { get; set; }
    }

}

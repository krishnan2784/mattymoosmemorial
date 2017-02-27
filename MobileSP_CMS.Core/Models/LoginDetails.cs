using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Interfaces.Models;

namespace MobileSP_CMS.Core.Models
{
    public class LoginDetails 
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}

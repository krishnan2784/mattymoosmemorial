﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models
{
    public interface ILoginDetails 
    {
        string UserName { get; set; }
        string Password { get; set; }
        bool RememberMe { get; set; }
    }
}

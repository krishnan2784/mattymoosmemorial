using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models.Interfaces
{
    public interface IBaseRequest
    {
        string AccessTokenField { get; set; }
        string CurrentCultureField { get; set; }
        string CurrentUICultureField { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Models.Interfaces
{
    public class BaseRequest : IBaseRequest
    {
        public virtual string AccessToken{ get; set; }
        public virtual string CurrentCulture { get; set; }
        public virtual string CurrentUICulture { get; set; }
    }
}

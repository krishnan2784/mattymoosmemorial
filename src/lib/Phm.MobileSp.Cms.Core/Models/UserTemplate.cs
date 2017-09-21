using System;
using System.Collections.Generic;
using System.Text;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class UserTemplate : BaseModel
    {
        public string AreaCode { get; set; }
        public string AreaName { get; set; }
        public MediaInfo Avatar { get; set; }
        public int? AvatarId { get; set; }
        public string DealershipCode { get; set; }
        public string DealershipName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RegionCode { get; set; }
        public string RegionName { get; set; }
        public int TotalMLearningPoints { get; set; }
        public string UserName { get; set; }
        public string ZoneCode { get; set; }
        public string ZoneName { get; set; }
        public SecGroupNM1 SecGroup { get; set; }
    }

}

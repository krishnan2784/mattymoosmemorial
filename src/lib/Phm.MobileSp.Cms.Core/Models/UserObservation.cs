using System.Collections.Generic;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class UserObservation
    {
        public int FeedId{ get; set; }
        
        public User User { get; set; }

        public int UserId { get; set; }
        
    }
}

﻿using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class UserMarket : IUserMarket
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual bool IsDefault { get; set; }
    }
    
}
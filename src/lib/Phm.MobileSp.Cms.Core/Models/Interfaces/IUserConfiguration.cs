﻿namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface IUserConfiguration
    {
        bool IsDefault { get; set; }
        int MarketId { get; set; }
        int RoleId { get; set; }
        int UserId { get; set; }
    }
}

using System;

namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface IBaseModel
    {
        DateTime? CreatedAt { get; set; }
        DateTime? DeletedAt { get; set; }
        bool Enabled { get; set; }
        int Id { get; set; }
        Guid? MasterId { get; set; }
        bool Published { get; set; }
        DateTime? UpdatedAt { get; set; }
    }
}

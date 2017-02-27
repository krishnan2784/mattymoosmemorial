using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileSP_CMS.Core.Interfaces.Models
{
    public interface IBaseModel
    {
        DateTime CreatedAt { get; set; }
        DateTime? DeletedAt { get; set; }
        bool Enabled { get; set; }
        int Id { get; set; }
        Guid? MasterId { get; set; }
        bool Published { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}

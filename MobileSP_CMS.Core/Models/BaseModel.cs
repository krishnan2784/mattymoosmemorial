using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Models
{
    public abstract class BaseModel : IBaseModel
    {
        public virtual DateTime CreatedAt { get; set; }
        public virtual DateTime? DeletedAt { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual int Id { get; set; }
        public virtual Guid? MasterId { get; set; }
        public virtual bool Published { get; set; }
        public virtual DateTime UpdatedAt { get; set; }
    }
}

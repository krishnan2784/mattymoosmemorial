using System;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Core.Models
{
	public abstract class BaseModel : object
	{
		public virtual DateTime CreatedAt { get; set; }
		public virtual DateTime? DeletedAt { get; set; }
		public virtual bool Enabled { get; set; }
		public virtual int Id { get; set; }
		public virtual Guid? MasterId { get; set; }
		public virtual bool Published { get; set; }
		public virtual DateTime UpdatedAt { get; set; }
	}

	public abstract class BasicBaseModel : object
	{
		public virtual DateTime CreatedAt { get; set; }
		public virtual DateTime? DeletedAt { get; set; }
		public virtual int Id { get; set; }
	}
}

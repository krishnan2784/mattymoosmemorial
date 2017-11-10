using System;
using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class TabText
    {
	    public int Id { get; set; }
	    public DateTime CreatedAt { get; set; }
	    public DateTime UpdatedAt { get; set; }
		public int MediaTabbedTextFeedPageId { get; set; }
        public string Title { get; set; }
        public string BodyText { get; set; }
        public int Order { get; set; }
    }
}
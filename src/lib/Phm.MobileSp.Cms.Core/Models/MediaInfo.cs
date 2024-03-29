﻿using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class MediaInfo : BaseModel
    {
        public virtual string Extension { get; set; }
        public virtual int MarketId { get; set; }
        public virtual string MediaId { get; set; }
        public virtual MediaTypes MediaType { get; set; }
        public virtual int MediaVersion { get; set; }
        public virtual string Name { get; set; }
        public virtual string Path { get; set; }
        public virtual string Preview1Path { get; set; }
        public virtual long Size { get; set; }
        public virtual string AzureUrl { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Enumerations;
using MobileSP_CMS.Core.Models;

namespace MobileSP_CMS.Core.Interfaces.Models
{
    public interface IBaseFeed : IBaseModel
    {
        FeedCategoryEnum FeedCategory { get; set; }
        FeedTypeEnum FeedType { get; set; }
        MediaInfo MainIcon { get; set; }
        int MarketId { get; set; }
        int Points { get; set; }
        string Title { get; set; }
    }
}

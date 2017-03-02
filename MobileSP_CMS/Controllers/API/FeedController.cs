using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Core.Repositories;
using MobileSP_CMS.Infrastructure.Repositories;

namespace MobileSP_CMS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class FeedController : BaseController
    {
        [HttpGet("[action]")]
        public async Task<IEnumerable<BaseFeed>> GetFeedItems()
        {
            var feedRepo = GetRespository<IFeedRepository>();
            feedRepo.RequestCriteria = new FeedCriteria
            {
                MarketId = CurrentMarketId()
            };
            var feedItems = await feedRepo.GetFeedItemsAsync<BaseFeed>();
            return feedItems;
        }
    }
}

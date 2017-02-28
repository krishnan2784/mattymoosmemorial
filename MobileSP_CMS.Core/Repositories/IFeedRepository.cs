using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Repositories
{
    public interface IFeedRepository : IBaseRepository
    {
        Task<TFeedType> GetFeedItemAsync<TFeedType>(int feedItemId) where TFeedType : BaseFeed;
        Task<IEnumerable<TFeedType>> GetFeedItemsAsync<TFeedType>() where TFeedType : BaseFeed;
    }
}

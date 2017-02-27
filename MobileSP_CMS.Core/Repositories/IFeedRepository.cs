using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Core.Repositories
{
    public interface IFeedRepository
    {
        Task<IBaseFeed> GetFeedItemAsync(int feedItemId);
        Task<IEnumerable<IBaseFeed>> GetFeedRoles();
    }
}

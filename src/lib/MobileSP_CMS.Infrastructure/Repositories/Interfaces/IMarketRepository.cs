using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSP_CMS.Core.Models;

namespace MobileSP_CMS.Infrastructure.Repositories.Interfaces
{
    public interface IMarketRepository : ICoreBaseRepository
    {
        Task<IEnumerable<Market>> GetMarketsAsync();
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Enumerations;

namespace MobileSP_CMS.Infrastructure.Repositories.Interfaces
{
    public interface IMarketRepository : IReadingRepository
    {
        Task<IEnumerable<Market>> GetMarketsAsync();
    }
}

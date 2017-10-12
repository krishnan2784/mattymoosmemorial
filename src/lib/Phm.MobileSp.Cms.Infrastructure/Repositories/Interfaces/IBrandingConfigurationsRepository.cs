using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IBrandingConfigurationsRepository
  {
        Task<dynamic> GetBrandingConfigurationsAsync(int marketId);
        Task<dynamic> UpdateBrandingConfigurationsAsync(List<BrandingElement> brandingElements);
  }
}

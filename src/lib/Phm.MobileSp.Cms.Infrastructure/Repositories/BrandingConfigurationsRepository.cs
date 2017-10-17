using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
	public class BrandingConfigurationsRepository : BaseRepository, IBrandingConfigurationsRepository
	{
		public BrandingConfigurationsRepository(IHttpClientService client): base(client, "BrandingConfigurations") {       }

		public async Task<dynamic> GetBrandingConfigurationsAsync(int marketId)
		{
			var response = await GetAsync(new {marketId});
			//var response = await GetAsync();
			return GetResponseModel<dynamic>(response);
		}

		public async Task<dynamic> UpdateBrandingConfigurationsAsync(List<BrandingElement> brandingElements)
		{
			var response = await PutAsync(brandingElements);
			return GetResponseModel<dynamic>(response);
		}
	}
}

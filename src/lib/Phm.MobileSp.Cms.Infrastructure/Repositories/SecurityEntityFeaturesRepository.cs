using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class SecurityEntityFeaturesRepository : BaseRepository, ISecurityEntityFeaturesRepository
	{
        public SecurityEntityFeaturesRepository(IHttpClientService client)
            : base(client, "SecurityEntityFeatures") {
        }

		public async Task<IEnumerable<SecFeaturePermission>> GetEntityPermissions(int id)
		{
			var response = await GetAsync(new { secEntityId = id });
			return GetResponseModel<IEnumerable<SecFeaturePermission>>(response);
		}

	}
}

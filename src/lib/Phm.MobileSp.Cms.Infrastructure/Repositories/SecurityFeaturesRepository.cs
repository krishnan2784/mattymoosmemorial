using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class SecurityFeaturesRepository : BaseRepository, ISecurityFeaturesRepository
	{
        public SecurityFeaturesRepository(IHttpClientService client)
            : base(client, "SecurityFeatures") {
        }

		public async Task<IEnumerable<SecFeature>> GetPermissions()
		{
			var response = await GetAsync();
			return GetResponseModel<IEnumerable<SecFeature>>(response);
		}

	}
}

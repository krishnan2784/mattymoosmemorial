using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class SecurityEntityFeaturesRepository : BaseRepository, ISecurityEntityFeaturesRepository
    {
	    private IUserTemplateRepository _userTemplateRepository;
		public SecurityEntityFeaturesRepository(IHttpClientService client, IUserTemplateRepository userTemplateRepository)
            : base(client, "SecurityEntityFeatures")
		{
			_userTemplateRepository = userTemplateRepository;
		}

		public async Task<IEnumerable<SecFeaturePermission>> GetEntityPermissions(int id)
		{
			var response = await GetAsync(new { secEntityId = id });
			return GetResponseModel<IEnumerable<SecFeaturePermission>>(response);
		}
		public async Task<IEnumerable<SecFeaturePermission>> GetCurrentUsersPermissions(int userId, int secEntityId)
		{
			var userProfile = (await _userTemplateRepository.GetUsersAsync(0, userId))?[0];

			var userPermissions = GetResponseModel<List<SecFeaturePermission>>(await GetAsync(new { secEntityId }));

			if (userProfile != null)
			{
				var groupPermissions = GetResponseModel<List<SecFeaturePermission>>(await GetAsync(new {secEntityId = userProfile.SecGroup.Id}));
				foreach (var p in groupPermissions)
				{
					if (userPermissions.All(x => x.SecFeatureId != p.SecFeatureId))
						userPermissions.Add(p);
				}
			}
			return userPermissions;
		}
		
	}
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class UserFeaturePermissionsRepository : BaseRepository, IUserFeaturePermissionsRepository
	{
        public UserFeaturePermissionsRepository(IHttpClientService client)
            : base(client, "UserFeaturePermissions") {
        }
		
		public async Task<List<SecFeaturePermission>> UpdateEntityPermissions(List<SecFeaturePermission> permissions)
		{
			var response = new List<SecFeaturePermission>();
			foreach (var sfp in permissions)
			{
				var r = await PutAsync(sfp);
				response.Add(GetResponseModel<SecFeaturePermission>(r));
			}
			return response;
		}

		public async Task<bool> DeleteEntityPermissions(int id)
		{
			var response = await DeleteAsync(id);
			return GetResponseModel<bool>(response);
		}
	}
}

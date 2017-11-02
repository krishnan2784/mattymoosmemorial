using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileSPCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using SecurityService;
using AutoMapper;
using Microsoft.Extensions.Options;
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class SecurityFeaturePermissionsRepository : BaseRepository, ISecurityFeaturePermissionsRepository
	{
        public SecurityFeaturePermissionsRepository(IHttpClientService client)
            : base(client, "SecurityFeaturePermissions") {
        }

		private static List<SecUserFeaturePermission> dummy = new List<SecUserFeaturePermission>
		{
			new SecUserFeaturePermission {Allow = true, FeatureHttpVerb = "GET", FeatureUri = "LeaderboardData", SecFeatureType = SecFeatureTypeEnum.Cms },
			new SecUserFeaturePermission {Allow = true, FeatureHttpVerb = "GET", FeatureUri = "FeedItem", SecFeatureType = SecFeatureTypeEnum.Cms },
			new SecUserFeaturePermission {Allow = false, FeatureHttpVerb = "POST", FeatureUri = "FeedItem", SecFeatureType = SecFeatureTypeEnum.Cms }
		};

		public async Task<BaseResponse<IEnumerable<SecUserFeaturePermission>>> GetUserPermissions(int id)
	    {
		    return new BaseResponse<IEnumerable<SecUserFeaturePermission>>(dummy);
		}
		public async Task<BaseResponse<IEnumerable<SecUserFeaturePermission>>> GetUserGroupPermissions(int id)
	    {
		    return new BaseResponse<IEnumerable<SecUserFeaturePermission>>(dummy);
			// return GetAPIResponse<dynamic>(await GetAsync(new { id }));
		}
	}
}

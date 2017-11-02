using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ISecurityFeaturePermissionsRepository
	{
        Task<BaseResponse<IEnumerable<SecUserFeaturePermission>>> GetUserPermissions(int id);
        Task<BaseResponse<IEnumerable<SecUserFeaturePermission>>> GetUserGroupPermissions(int id);
	}
}

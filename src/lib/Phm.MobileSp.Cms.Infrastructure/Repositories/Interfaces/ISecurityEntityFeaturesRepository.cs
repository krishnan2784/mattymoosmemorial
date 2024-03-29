﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ISecurityEntityFeaturesRepository
	{
        Task<IEnumerable<SecFeaturePermission>> GetEntityPermissions(int id);
        Task<IEnumerable<SecFeaturePermission>> GetCurrentUsersPermissions(int userId, int secEntityId);
	}
}

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

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class SecurityGroupsRepository : BaseRepository, ISecurityGroupsRepository
    {
        private readonly IMarketRepository _marketRepo;
        private readonly IUserConfigurationRepository _userConfigRepo;
        public SecurityGroupsRepository(IHttpClientService client, IMarketRepository marketRepo, IUserConfigurationRepository userConfigRepo)
            : base(client, "SecurityGroups") {
            _marketRepo = marketRepo;
            _userConfigRepo = userConfigRepo;
        }

        public async Task<BaseResponse<dynamic>> GetSecGroupsAsync(int MarketId)
        {
            return GetAPIResponse<dynamic>(await GetAsync(new { MarketId }));
        }
    }
}

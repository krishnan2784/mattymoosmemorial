using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Options;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class UserConfigurationRepository : BaseRepository, IUserConfigurationRepository
    {
        private readonly IMarketRepository _marketRepo;
        public UserConfigurationRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria,
            IMarketRepository marketRepo)
            : base(connStrings, baseRequest, baseCriteria, "UserConfiguration") {
            _marketRepo = marketRepo;
        }

        public async Task<IEnumerable<UserConfiguration>> GetUserConfigurationsByUserId(int UserId)
        {
            var response = await GetAsync(new { UserId });
            return response.Content;
        }
    }
}

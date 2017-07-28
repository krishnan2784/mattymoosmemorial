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
        public UserConfigurationRepository(IHttpClientService client, IMarketRepository marketRepo)
            : base(client, "UserConfiguration") {
            _marketRepo = marketRepo;
        }

        public async Task<List<UserConfiguration>> GetUserConfigurationsByUserId(int UserId)
        {
            var response = GetResponseModel<List<UserConfiguration>>(await PostAsync(new { Criteria = new{ UserId } }));
            return response;
        }
    }

}

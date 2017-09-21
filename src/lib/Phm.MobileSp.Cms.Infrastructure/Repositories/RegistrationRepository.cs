using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System;
using Newtonsoft.Json;
using System.Net.Http;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class RegistrationRepository : BaseRepository, IRegistrationRepository
    {
        private readonly IMarketRepository _marketRepo;
        private readonly IUserConfigurationRepository _userConfigRepo;

        public RegistrationRepository(IHttpClientService client, IMarketRepository marketRepo, IUserConfigurationRepository userConfigRepo)
            : base(client, "User") {
            _marketRepo = marketRepo;
            _userConfigRepo = userConfigRepo;
        }

        public async Task<MLearningUser> GetUser(string userToken)
        {
            if (string.IsNullOrEmpty(userToken))
                return null;

            var response = await GetAsync("CurrentUser");
            var m = GetResponseModel<User>(response);

            return new MLearningUser() { Email = m.Email,
            FirstName = m.FirstName,
            LastName = m.LastName};
        }

        public async Task<bool> UpdateUserPassword(int userId, string password)
        {
            return new Random().Next(11) % 2 == 0;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileSPCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class UserRepository : CoreBaseRepository, IUserRepository
    {
        private readonly ICoreContract _proxyClient;

        public UserRepository(ICoreContract proxyClient, IBaseRequest baseRequest, IBaseCriteria baseRBaseCriteria)
            : base(baseRequest, baseRBaseCriteria)
        {
            _proxyClient = proxyClient;
        }

        public async Task<IApplicationUser> GetUserAsync(ILoginDetails loginDetails)
        {
            var applicationUser = await ValidateUser(loginDetails.UserName, loginDetails.Password);

            if (applicationUser.ValidUser)
            {
                applicationUser.UserRoles = await GetUserRoles(applicationUser);
                applicationUser.UserConfigurations = await GetUserConfigurationsByUserId(applicationUser.UserDetails.Id);
                applicationUser.UserDetails.DefaultMarketId = applicationUser.UserConfigurations.FirstOrDefault(x=>x.IsDefault).MarketId;
            }
            return applicationUser;
        }

        private async Task<IApplicationUser> ValidateUser(string username, string password)
        {
            var applicationUser = new ApplicationUser();
            try
            {
                var request = GetRequest(new ValidateUserRequest
                {
                    UserName = username,
                    Password = password
                });
                var response = await _proxyClient.ValidateUserAsync(request);

                applicationUser.SessionGuid = response.SessionGUID;
                var mapper = new AutoMapperGenericsHelper<UserDto, MLearningUser>();
                applicationUser.UserDetails = mapper.ConvertToDbEntity(response.CurrentUser);
            }
            catch (Exception ex)
            {
            }
            return applicationUser;
        }

        public async Task<IEnumerable<string>> GetUserRoles(IApplicationUser user)
        {
            // not yet implemented 
            var list = new List<string>();
            return list;
        }

        public async Task<IEnumerable<IUserConfiguration>> GetUserConfigurationsByUserId(int userId)
        {
            var request = GetRequest(new GetUserConfigurationsRequest
            {
                Criteria = new UserConfigurationCriteriaDto
                {
                    IsLiveMarket = false,
                    UserId = userId
                }
            });

            var response = await _proxyClient.GetUserConfigurationsAsync(request);
            var mapper = new AutoMapperGenericsHelper<UserConfigurationDto, UserConfiguration>();

            var list = mapper.ConvertToDbEntity(response.UserConfigurations);
            return list;
        }

        public async Task<IEnumerable<IUserMarket>> GetUserMarkets(IMarketRepository marketRepo, int userId)
        {
            var list = new List<IUserMarket>();

            var configs = await GetUserConfigurationsByUserId(userId);
            
            var markets = await marketRepo.GetMarketsAsync();

            foreach (var config in configs)
            {
                var market = markets.First(x => x.Id == config.MarketId);
                list.Add(new UserMarket()
                {
                    Id = config.MarketId,
                    IsDefault = config.IsDefault,
                    Name = market.Name,
                    IsMaster = market.IsMaster,
                });
            }

            return list;
        }


        public async Task<IEnumerable<IMLearningUser>> GetUsersAsync()
        {
            var users = new List<MLearningUser>();
            try
            {
                var request = GetRequest(new GetUsersRequest());

                var response = await _proxyClient.GetUsersAsync(request);
                
                var mapper = new AutoMapperGenericsHelper<UserDto, MLearningUser>();
                users = mapper.ConvertToDbEntity(response.Users);
            }
            catch (Exception ex)
            {
            }
            return users;
        }


    }
}

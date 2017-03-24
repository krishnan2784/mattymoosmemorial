using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MobileSP_CMS.Core.Models;
using MobileSPCoreService;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        private readonly CoreContractClient _proxy = new CoreContractClient();

        public async Task<ApplicationUser> GetUserAsync(LoginDetails loginDetails)
        {
            var applicationUser = await ValidateUser(loginDetails.UserName, loginDetails.Password);

            if (applicationUser.ValidUser)
            {
                BaseRequest.AccessToken = applicationUser.SessionGuid;
                applicationUser.UserRoles = await GetUserRoles(applicationUser);
                applicationUser.UserConfigurations = await GetUserConfigurationsByUserId(applicationUser.UserDetails.Id);
                applicationUser.UserDetails.DefaultMarketId = applicationUser.UserConfigurations.FirstOrDefault(x=>x.IsDefault).MarketId;
            }
            return applicationUser;
        }

        private async Task<ApplicationUser> ValidateUser(string username, string password)
        {
            var applicationUser = new ApplicationUser();
            try
            {
                var response = await _proxy.ValidateUserAsync(new ValidateUserRequest {
                    AccessToken = BaseRequest.AccessToken,
                    UserName = username,
                    Password = password
                });

                applicationUser.SessionGuid = response.SessionGUID;
                var mapper = new AutoMapperGenericsHelper<UserDto, User>();
                applicationUser.UserDetails = mapper.ConvertToDbEntity(response.CurrentUser);
                
                _proxy.Dispose();
            }
            catch (Exception ex)
            {
            }
            return applicationUser;
        }

        public async Task<IEnumerable<string>> GetUserRoles(ApplicationUser user)
        {
            var list = new List<string>();
            return list;
        }
        public async Task<IEnumerable<UserConfiguration>> GetUserConfigurationsByUserId(int userId)
        {
            var response = await _proxy.GetUserConfigurationsAsync(new GetUserConfigurationsRequest()
            {
                AccessToken = BaseRequest.AccessToken,
                Criteria = new UserConfigurationCriteriaDto()
                {
                    IsLiveMarket = false,
                    UserId = userId
                }
            });
            var mapper = new AutoMapperGenericsHelper<UserConfigurationDto, UserConfiguration>();

            var list = mapper.ConvertToDbEntity(response.UserConfigurations);
            return list;
        }

        public async Task<IEnumerable<UserMarket>> GetUserMarkets(int userId)
        {
            var list = new List<UserMarket>();

            var configs = await GetUserConfigurationsByUserId(userId);

            var marketRepo = new MarketRepository();
            marketRepo.BaseRequest.AccessToken = BaseRequest.AccessToken;
            var markets = await marketRepo.GetMarketsAsync();

            foreach (var config in configs)
            {
                list.Add(new UserMarket()
                {
                    Id = config.MarketId,
                    IsDefault = config.IsDefault,
                    Name = markets.First(x => x.Id == config.MarketId).Name
                });
            }

            return list;
        }


        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            var users = new List<User>();
            try
            {
                var response = await _proxy.GetUsersAsync(new GetUsersRequest()
                {
                    AccessToken = BaseRequest.AccessToken
                });
                
                var mapper = new AutoMapperGenericsHelper<UserDto, User>();
                users = mapper.ConvertToDbEntity(response.Users);

                _proxy.Dispose();
            }
            catch (Exception ex)
            {
            }
            return users;
        }


    }
}

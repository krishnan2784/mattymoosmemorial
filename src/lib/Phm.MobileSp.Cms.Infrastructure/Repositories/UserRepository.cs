﻿using System.Threading.Tasks;
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
    public class UserRepository : BaseRepository, IUserRepository
    {
        private readonly IMarketRepository _marketRepo;
        private readonly IUserConfigurationRepository _userConfigRepo;

        public UserRepository(IHttpClientService client, IMarketRepository marketRepo, IUserConfigurationRepository userConfigRepo)
            : base(client, "User") {
            _marketRepo = marketRepo;
            _userConfigRepo = userConfigRepo;
        }


        public async Task<Tuple<ApplicationUser, string>> GetUserAsync(LoginDetails loginDetails)
        {
            var applicationUser = new ApplicationUser();
            string message = string.Empty;
            try
            {
                applicationUser = await ValidateUser(loginDetails.UserName, loginDetails.Password);
            }
            catch (Exception ex)
            {
                if (ex.Message == "Managed Exception")
                    message = "Your username or password is incorrect. Please try again.";
                else
                    message = $"An error occurred while attempting to access MobileSP. Please try again. <span class=\"hidden\">{ex.Message}</span>";
            }

            if (applicationUser.ValidUser)
            {
                _clientService.SetAuthToken(applicationUser.SessionGuid);
                applicationUser.UserConfigurations = await _userConfigRepo.GetUserConfigurationsByUserId((int)applicationUser.UserDetails?.Id);
                applicationUser.UserDetails.DefaultMarketId = applicationUser.UserConfigurations.FirstOrDefault(x => x.IsDefault).MarketId;
            }
            else if (string.IsNullOrEmpty(message))
            {
                message = "Your username or password is incorrect. Please try again.";
            }

            return Tuple.Create(applicationUser, message);
        }

        private async Task<ApplicationUser> ValidateUser(string username, string password)
        {  
            var response = GetResponseModel<dynamic>(await PostAsync(new { Username = username, Password = password }));
            var user = new ApplicationUser()
            {
                SessionGuid = response.SessionGUID.ToObject<string>(),
                UserDetails = response.CurrentUser.ToObject<MLearningUser>()
            };
            return user;
        }
        
        public async Task<dynamic> GetCurrentUser() {
            var response = await GetAsync("CurrentUser");
            return GetResponseModel<User>(response);
        }

        public async Task<IEnumerable<UserMarket>> GetUserMarkets(int userId)
        {
            var list = new List<UserMarket>();

            var configs = await _userConfigRepo.GetUserConfigurationsByUserId(userId);

            var markets = await _marketRepo.GetMarketsAsync();

            foreach (var config in configs)
            {
                if (list.Any(x => x.Id == config.MarketId))
                    continue;

                var market = markets.First(x => x.Id == config.MarketId);
                bool isLiveMarket = market.IsLive != null && (bool)market.IsLive;
                
                list.Add(new UserMarket()
                {
                    Id = config.MarketId,
                    IsDefault = config.IsDefault,
                    Name = market.Name,
                    IsMaster = market.IsMaster,
                    IsLive = isLiveMarket
                });
                if (!market.IsMaster && !isLiveMarket)
                {
                    var liveMarket = markets.FirstOrDefault(x => (bool)x.IsLive && x.Id != market.Id && x.Name.Contains(market.Name));
                    if (liveMarket != null && liveMarket.Id > 0)
                        list.Add(new UserMarket()
                        {
                            Id = liveMarket.Id,
                            Name = liveMarket.Name,
                            IsDefault = false,
                            IsMaster = false,
                            IsLive = true
                        });
                }
            }

            return list;
        }
    }
}

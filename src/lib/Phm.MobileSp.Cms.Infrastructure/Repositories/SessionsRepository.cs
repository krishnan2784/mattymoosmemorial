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
using Newtonsoft.Json;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class SessionsRepository : BaseRepository, ISessionsRepository
    {
        private readonly IUserRepository _userRepository;
        public SessionsRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria, 
            IUserRepository userRepository) : base(connStrings, baseRequest, baseCriteria, "Sessions") {
            _userRepository = userRepository;
        }


        public async Task<Tuple<ApplicationUser, string>> GetUserAsync(ILoginDetails loginDetails)
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

                _userRepository.SetAuthToken(applicationUser.SessionGuid);
                applicationUser.UserConfigurations = await _userRepository.GetUserConfigurationsByUserId(applicationUser.UserDetails.Id);
                applicationUser.UserDetails.DefaultMarketId = applicationUser.UserConfigurations.FirstOrDefault(x=>x.IsDefault).MarketId;
            } else if (string.IsNullOrEmpty(message))
            {
                message = "Your username or password is incorrect. Please try again.";
            }

            return Tuple.Create(applicationUser, message);
        }

        private async Task<ApplicationUser> ValidateUser(string username, string password)
        {
            return await PostAsync("", new { credentials = new { username, password } });
        }
    }
}

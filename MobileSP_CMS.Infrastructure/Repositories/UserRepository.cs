using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MobileSP_CMS.Core.Models;
using MobileSPCoreService;
using MobileSP_CMS.Core.Repositories;

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
                applicationUser.UserRoles = await GetUserRoles(applicationUser);
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

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MobileSP_CMS.Core.Interfaces.Models;
using MobileSP_CMS.Core.Interfaces.Repositories;
using MobileSP_CMS.Core.Models;
using MobileSPCoreService;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private CoreContractClient _proxy;

        public async Task<IApplicationUser> GetUserAsync(ILogin loginDetails)
        {
            var applicationUser = await ValidateUser(loginDetails.UserName, loginDetails.Password);

            if (applicationUser.ValidUser)
            {
                applicationUser.UserRoles = await GetUserRoles(applicationUser);
            }
            return applicationUser;
        }

        private async Task<IApplicationUser> ValidateUser(string username, string password)
        {
            var applicationUser = new ApplicationUser();
            _proxy = new CoreContractClient();
            try
            {
                var response = await _proxy.ValidateUserAsync(new ValidateUserRequest {
                    AccessToken = Contstants.CstAccesstoken,
                    UserName = username,
                    Password = password
                });

                applicationUser.SessionGuid = response.SessionGUID;
                var mapper = new AutoMapperGenericsHelper<UserDto, User>();
                var user = mapper.ConvertToDbEntity(response.CurrentUser);
                applicationUser.UserDetails = mapper.ConvertToDbEntity(response.CurrentUser);

                _proxy.Dispose();
            }
            catch (Exception ex)
            {
            }
            return applicationUser;
        }

        public async Task<IEnumerable<string>> GetUserRoles(IApplicationUser user)
        {
            var list = new List<string>();
            return list;
        }

        public async Task<IEnumerable<IUser>> GetUsersAsync()
        {
            var users = new List<User>();
            _proxy = new CoreContractClient();
            try
            {
                var response = await _proxy.GetUsersAsync(new GetUsersRequest()
                {
                    AccessToken = Contstants.CstAccesstoken
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

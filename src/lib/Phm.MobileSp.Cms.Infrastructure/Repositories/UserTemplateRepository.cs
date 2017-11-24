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
using System.Net.Http;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class UserTemplateRepository : BaseRepository, IUserTemplateRepository
    {
        private readonly IMarketRepository _marketRepo;
        public UserTemplateRepository(IHttpClientService client, IMarketRepository marketRepo) : base(client, "UserTemplate") {
            _marketRepo = marketRepo;
        }

        public async Task<List<UserTemplate>> GetUsersAsync(int MarketId, int? UserId)
        {
            return GetResponseModel<List<UserTemplate>>(await GetAsync(new { MarketId, UserId }));
        }

        public async Task<BaseResponse<UserTemplate>> CreateUserAsync(UserTemplate user)
        {

            try
            {
                user.UserName = user.FirstName + user.LastName;
                var response = await CreateAsync(user);
                return GetAPIResponse<UserTemplate>(response, "Succesfully created " + user.FirstName);
            }
            catch (Exception ex)
            {
                return new BaseResponse<UserTemplate>(false, ex.Message);
            }
        }

        public async Task<BaseResponse<UserTemplate>> UpdateUserAsync(UserTemplate user)
        {
            try
            {
                var response = await PutAsync(user);
                return GetAPIResponse<UserTemplate>(response, "Succesfully updated " + user.FirstName);
            }
            catch (Exception ex)
            {
                return new BaseResponse<UserTemplate>(false, ex.Message);
            }
        }
    }
}

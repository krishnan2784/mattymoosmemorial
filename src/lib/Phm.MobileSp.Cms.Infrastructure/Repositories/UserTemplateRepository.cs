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

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class UserTemplateRepository : BaseRepository, IUserTemplateRepository
    {
        private readonly IMarketRepository _marketRepo;
        public UserTemplateRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria,
            IMarketRepository marketRepo)
            : base(connStrings, baseRequest, baseCriteria, "UserTemplate") {
            _marketRepo = marketRepo;
        }

        public async Task<dynamic> GetUsersAsync(int MarketId, int? UserId)
        {
            return await GetAsync<dynamic>(new { MarketId, UserId });
        }

        public async Task<BaseResponse> CreateUserAsync(UserTemplate user)
        {

            try
            {
                user.UserName = user.FirstName + user.LastName;
                var response = await CreateAsync<UserTemplate>(user);
                return new BaseResponse(response.Success, "Succesfully created " + user.FirstName, response.Content);
            }
            catch (Exception ex)
            {
                return new BaseResponse(false, ex.Message);
            }
        }

        public async Task<BaseResponse> UpdateUserAsync(UserTemplate user)
        {
            try
            {
                var response = await UpdateAsync<UserTemplate>(user);
                return new BaseResponse(response.Success, "Succesfully updated " + user.FirstName, response.Content);
            }
            catch (Exception ex)
            {
                return new BaseResponse(false, ex.Message);
            }
        }
    }
}

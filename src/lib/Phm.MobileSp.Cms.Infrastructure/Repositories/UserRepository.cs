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

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class UserRepository : CoreBaseRepository, IUserRepository
    {
        private readonly ICoreContract _proxyClient;
        private readonly ISecurityContract _securityClient;

        public UserRepository(ICoreContract proxyClient, ISecurityContract securityClient, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(baseRequest, baseCriteria)
        {
            _proxyClient = proxyClient;
            _securityClient = securityClient;
        }

        
        public async Task<dynamic> GetCurrentUser() {
            var request = GetRequest(new MobileSPCoreService.RequestBase());
            var response = await _proxyClient.GetCurrentUserAsync(request);
            return response.CurretUser;            
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
                message = $"An error occurred while attempting to access MobileSP. Please try again. <span class=\"hidden\">{ex.Message}</span>";
            }

            if (applicationUser.ValidUser)
            {
                applicationUser.UserRoles = await GetUserRoles(applicationUser);
                applicationUser.UserConfigurations = await GetUserConfigurationsByUserId(applicationUser.UserDetails.Id);
                applicationUser.UserDetails.DefaultMarketId = applicationUser.UserConfigurations.FirstOrDefault(x=>x.IsDefault).MarketId;
            } else if (string.IsNullOrEmpty(message))
            {
                message = "Your username or password is incorrect. Please try again.";
            }

            return Tuple.Create(applicationUser, message);
        }

        private async Task<ApplicationUser> ValidateUser(string username, string password)
        {
            var applicationUser = new ApplicationUser();

            var request = GetRequest(new ValidateUserRequest
            {
                UserName = username,
                Password = password
            });
            var response = await _proxyClient.ValidateUserAsync(request);

            applicationUser.SessionGuid = response.SessionGUID;
            var mapper = new AutoMapperGenericsHelper<MobileSPCoreService.UserDto, MLearningUser>();
            applicationUser.UserDetails = mapper.ConvertToDbEntity(response.CurrentUser);

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
                bool isLiveMarket = (bool)market.IsLive;
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
                    var liveMarket = markets.FirstOrDefault(x => (bool)x.IsLive && x.Id!= market.Id && x.Name.Contains(market.Name));
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


        public async Task<dynamic> GetUsersAsync(int marketId, int? userId)
        {
            try
            {
                var request = new GetUserTemplates1Request() {
                    AccessToken = BaseRequest.AccessToken,
                    Criteria = new UserTemplate1CriteriaDto()
                    {
                        MarketId = marketId,
                        UserId = userId
                    }
                };

                var response = await _securityClient.GetUserTemplates1Async(request);
                return response.UserTemplates1;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<BaseResponse> CreateUserAsync(UserTemplate user)
        {
            try
            {
                user.UserName = "Cheese";
                var userDto = GetUserTemplateDto(user);
                var request = new CreateUserTemplate1Request()
                {
                    AccessToken = BaseRequest.AccessToken,
                    CurrentUserTemplate1 = userDto
                };
                var response = await _securityClient.CreateUserTemplate1Async(request);
                return new BaseResponse(response.Created, "Succesfully created " + user.FirstName, GetUserTemplate(response.CurrentUserTemplate1));
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
                var userDto = GetUserTemplateDto(user);
                var request = new UpdateUserTemplate1Request()
                {
                    AccessToken = BaseRequest.AccessToken,
                    CurrentUserTemplate1 = userDto
                };
                var response = await _securityClient.UpdateUserTemplate1Async(request);
                return new BaseResponse(response.Updated, "Succesfully updated " + user.FirstName, GetUserTemplate(response.CurrentUserTemplate1));
            }
            catch (Exception ex)
            {
                return new BaseResponse(false, ex.Message);
            }
        }

        public async Task<BaseResponse> GetSecGroupsAsync(int marketId)
        {
            try
            {
                var request = new GetSecGroupsRequest()
                {
                    AccessToken = BaseRequest.AccessToken,
                    Criteria = new SecGroupCriteriaDto()
                    {
                        MarketId = marketId
                    }
                };
                var response = await _securityClient.GetSecGroupsAsync(request);
                return new BaseResponse(response.SecGroups);
            }
            catch (Exception ex)
            {
                return new BaseResponse(false, ex.Message);
            }
        }
                
        private UserTemplate1Dto GetUserTemplateDto(UserTemplate user)
        {
            return UserTemplateMapper().Map<UserTemplate1Dto>(user);
        }
        private UserTemplate GetUserTemplate(UserTemplate1Dto userDto)
        {
            return UserTemplateMapper().Map<UserTemplate>(userDto);
        }
        private IMapper UserTemplateMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<SecurityService.MediaInfoDto, MediaInfo>().ReverseMap();
                cfg.CreateMap<UserTemplate, UserTemplate1Dto>().ReverseMap();
                cfg.CreateMap<SecGroupNM1, SecGroupNM1Dto>().ReverseMap();
            }); 
            return config.CreateMapper();
        }
    }
}

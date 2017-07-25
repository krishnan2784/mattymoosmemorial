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
    public class UsersRepository : BaseRepository, IUsersRepository
    {
        private readonly IMarketRepository _marketRepo;
        private readonly IUserConfigurationRepository _userConfigRepo;
        public UsersRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria,
            IMarketRepository marketRepo, IUserConfigurationRepository userConfigRepo)
            : base(connStrings, baseRequest, baseCriteria, "Users") {
            _marketRepo = marketRepo;
            _userConfigRepo = userConfigRepo;
        }

        public async Task<IEnumerable<UserMarket>> GetUserMarkets(int userId)
        {
            var list = new List<UserMarket>();

            var configs = await _userConfigRepo.GetUserConfigurationsByUserId(userId);
            
            var markets = await _marketRepo.GetMarketsAsync();

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

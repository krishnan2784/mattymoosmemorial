using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System;
using Microsoft.Extensions.Options;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class LeaderBoardDataRepository : BaseRepository, ILeaderBoardDataRepository
    {
        public LeaderBoardDataRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "LeaderBoardData") {       }


        public async Task<dynamic> GetLeaderBoard(int currentMarketId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var response = await GetAsync<dynamic>(
                new {
                    MarketId = currentMarketId,
                    StartDate = startDate,
                    EndDate = endDate
                });
            return response?.Content.First();
        }        

    }
}

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
    public class LeaderBoardUserDataRepository : BaseRepository, ILeaderBoardUserDataRepository
    {
        public LeaderBoardUserDataRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "LeaderBoardUserData") {       }

        public async Task<dynamic> GetUserPointsHistory(int userId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var response = await GetAsync<dynamic>(
                new
                {
                    UserId = userId,
                    StartDate = startDate,
                    EndDate = endDate
                });
            return response?.Content.First();
        }

    }
}

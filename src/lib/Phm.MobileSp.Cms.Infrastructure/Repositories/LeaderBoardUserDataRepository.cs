using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System;
using Microsoft.Extensions.Options;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class LeaderBoardUserDataRepository : BaseRepository, ILeaderBoardUserDataRepository
    {
        public LeaderBoardUserDataRepository(IHttpClientService client)
            : base(client, "LeaderBoardUserData") {       }

        public async Task<dynamic> GetUserPointsHistory(int userId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var response = GetResponseModel<dynamic>(await GetAsync(
                new
                {
                    UserId = userId,
                    StartDate = startDate,
                    EndDate = endDate
                }));
            return response;
        }

    }
}

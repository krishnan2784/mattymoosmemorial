using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using System;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ILeaderBoardDataRepository
    {
        Task<dynamic> GetLeaderBoard(int currentMarketId, DateTime? startDate, DateTime? endDate);
    }
}

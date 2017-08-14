using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using System;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ILeaderBoardUserDataRepository
    {
        Task<dynamic> GetUserPointsHistory(int userId, DateTime? startDate, DateTime? endDate);
    }
}

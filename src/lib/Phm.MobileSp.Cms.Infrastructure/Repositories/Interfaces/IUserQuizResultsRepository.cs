using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using System;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IUserQuizResultsRepository
    {
        Task<IEnumerable<dynamic>> GetQuizResultsSummariesEX(int feedItemId, decimal lowerBoundary, decimal higherBoundary, int userGroupId);
    }
}

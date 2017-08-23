using System.Collections.Generic;
using System.Threading.Tasks;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using System;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IFeedSummariesRepository
    {
        Task<dynamic> GetQuizFeedSummaries(int feedItemId);
        Task<dynamic> GetSurveyFeedSummaries(int feedItemId);
        Task<dynamic> GetObservationFeedSummaries(int feedItemId);
    }
}

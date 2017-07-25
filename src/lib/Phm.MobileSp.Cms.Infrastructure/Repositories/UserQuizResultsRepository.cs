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
    public class UserQuizResultsRepository : BaseRepository, IUserQuizResultsRepository
    {
        public UserQuizResultsRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "UserQuizResults") {       }


        public async Task<IEnumerable<dynamic>> GetQuizResultsSummariesEX(int feedItemId, decimal lowerBoundary, decimal higherBoundary, int userGroupId)
        {
            var response = await GetAsync<dynamic>(new { QuizFeedId = feedItemId, LowerBoundary = lowerBoundary, HigherBoundary = higherBoundary, UserGroupId = userGroupId });
            return response?.Content.First();
        }

    }
}

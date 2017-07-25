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
using Phm.MobileSp.Cms.Core.Enumerations;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class FeedSummariesRepository : BaseRepository, IFeedSummariesRepository
    {
        public FeedSummariesRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(connStrings, baseRequest, baseCriteria, "FeedSummaries") { }

        public async Task<dynamic> GetQuizFeedSummaries(int feedItemId)
        {
            var response = await GetAsync<QuizSummaryDto>(new { feedItemId, ItemType = FeedTypeEnum.Quiz });
            return response?.Content.First();
        }

        public async Task<dynamic> GetSurveyFeedSummaries(int feedItemId)
        {
            var response = await GetAsync<SurveySummaryDto>(new { feedItemId, ItemType = FeedTypeEnum.Survey });
            return response?.Content.First();
        }

        public async Task<dynamic> GetObservationFeedSummaries(int feedItemId)
        {
            // TODO: Currently using survey call, observation call needs fixing in API.
            var response = await GetAsync<SurveySummaryDto>(new { feedItemId, ItemType = FeedTypeEnum.Survey });
            return response?.Content.First();
        }

    }
}
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
using System.Net.Http;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class FeedSummariesRepository : BaseRepository, IFeedSummariesRepository
    {
        public FeedSummariesRepository(IHttpClientService client) : base(client, "FeedSummaries") { }

        public async Task<dynamic> GetQuizFeedSummaries(int feedItemId)
        {
            var response = GetResponseModel<IEnumerable<QuizSummaryDto>>(await GetAsync(new
            {
                feedItemId,
                ItemType = FeedTypeEnum.Quiz
            }));
            return response?.First();
        }

        public async Task<dynamic> GetSurveyFeedSummaries(int feedItemId)
        {
            var response = GetResponseModel<IEnumerable<SurveySummaryDto>>(await GetAsync(new
            {
                feedItemId,
                ItemType = FeedTypeEnum.Survey
            }));
            return response?.First();
        }

        public async Task<dynamic> GetObservationFeedSummaries(int feedItemId)
        {
            // TODO: Currently using survey call, observation call needs fixing in API.
            var response = GetResponseModel<IEnumerable<SurveySummaryDto>>(await GetAsync(new {
                feedItemId,
                ItemType = FeedTypeEnum.Survey
            }));
            return response.First();
        }

    }
}
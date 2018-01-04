using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Server.Controllers;

namespace Phm.MobileSp.Cms.Server.RestAPI
{
    [Authorize]
    [Route("api/[controller]")]
    public class FeedSummariesController : BaseController
    {
        private readonly IFeedSummariesRepository _feedSummaryRepository;
        private readonly IUserQuizResultsRepository _quizSummaryRepository;

        public FeedSummariesController(IMemoryCache memoryCache, IFeedSummariesRepository feedSummaryRepository, IUserQuizResultsRepository quizSummaryRepository) : base(memoryCache)
        {
            _feedSummaryRepository = feedSummaryRepository;
            _quizSummaryRepository = quizSummaryRepository;
        }
        
        [HttpGet("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> GetQuizFeedSummaries(int feedItemId)
        {
            var feedItemResponse = await _feedSummaryRepository.GetQuizFeedSummaries(feedItemId);
            return Json(new BaseResponse<dynamic>(feedItemResponse));
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> GetQuizResultsSummariesEX(int feedItemId, decimal lowerBoundary = 0, decimal higherBoundary = 0, int userGroupId = 0)
        {
            var feedItemResponse = await _quizSummaryRepository.GetQuizResultsSummariesEX(feedItemId, lowerBoundary, higherBoundary, userGroupId);
            return Json(new BaseResponse<dynamic>(feedItemResponse));
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> GetSurveyFeedSummaries(int feedItemId)
        {
            var feedItemResponse = await _feedSummaryRepository.GetSurveyFeedSummaries(feedItemId);
            return Json(new BaseResponse<dynamic>(feedItemResponse));
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> GetObservationFeedSummaries(int feedItemId)
        {
            var feedItemResponse = await _feedSummaryRepository.GetObservationFeedSummaries(feedItemId);
            return Json(new BaseResponse<dynamic>(feedItemResponse));
        }

    }
}

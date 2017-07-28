using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using MLearningCoreService;
using Newtonsoft.Json;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models.Interfaces;

namespace Phm.MobileSp.Cms.Controllers.API
{
    [Authorize]
    [Route("api/[controller]")]
    [AiHandleError]
    public class LeaderboardController : BaseController
    {
        private readonly ILeaderBoardDataRepository _leaderboardRepo;
        private readonly ILeaderBoardUserDataRepository _leaderboardUserRepo;

        public LeaderboardController(IMemoryCache memoryCache, ILeaderBoardDataRepository leaderboardRepo, ILeaderBoardUserDataRepository leaderboardUserRepo) 
            : base(memoryCache)
        {
            _leaderboardRepo = leaderboardRepo;
            _leaderboardUserRepo = leaderboardUserRepo;
        }
        
        [HttpGet("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> GetLeaderBoard(DateTime? startDate = null, DateTime? endDate = null)
        {
            endDate = endDate?.AddDays(1);
            var response = await _leaderboardRepo.GetLeaderBoard(CurrentMarketId, startDate, endDate);
            return Json(new BaseResponse<dynamic>(response));
        }

        [HttpGet("[action]")]
        [JsonResponseWrapper]
        public async Task<JsonResult> GetUserPointsHistory(int userId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var response = await _leaderboardUserRepo.GetUserPointsHistory(userId, startDate, endDate);
            return Json(new BaseResponse<dynamic>(response));
        }

    }
}

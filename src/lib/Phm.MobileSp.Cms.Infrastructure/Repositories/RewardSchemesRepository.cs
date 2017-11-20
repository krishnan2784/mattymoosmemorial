using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
	public class RewardSchemesRepository : BaseRepository, IRewardSchemesRepository
	{
		public RewardSchemesRepository(IHttpClientService client): base(client, "RewardSchemes") {       }

		public async Task<dynamic> GetRewardSchemesAsync(int marketId)
		{
			var response = await GetAsync(new {marketId});
			return GetResponseModel<dynamic>(response);
		}

		public async Task<BaseRewardScheme> CreateRewardSchemesAsync(BaseRewardScheme rewardSchemes)
		{
			var response = await PostAsync(rewardSchemes);
			return GetResponseModel<dynamic>(response);
		}

		public async Task<BaseRewardScheme> UpdateRewardSchemesAsync(BaseRewardScheme rewardSchemes)
		{
			var response = await PutAsync(rewardSchemes);
			return GetResponseModel<dynamic>(response);
		}
	
		public async Task<bool> DeleteRewardSchemesAsync(int id)
		{
			var response = await DeleteAsync(id);
			return GetResponseModel<dynamic>(response);
		}
	}
}
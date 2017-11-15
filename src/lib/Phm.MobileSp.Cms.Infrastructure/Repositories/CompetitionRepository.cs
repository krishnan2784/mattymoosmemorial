using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
	public class CompetitionRepository : BaseRepository, ICompetitionRepository
	{
		public CompetitionRepository(IHttpClientService client): base(client, "Competition") {       }

		public async Task<dynamic> GetCompetitionAsync(int marketId)
		{
			return new List<BaseFeed>
			{
				new BaseFeed() { Id = 1, Title = "Test Model 1", PublishedLiveAt = new DateTime()},
				new BaseFeed() {Id = 2, Title = "Test Model 2", PublishedLiveAt = new DateTime()},
				new BaseFeed() {Id = 3, Title = "Test Model 3", PublishedLiveAt = new DateTime()}
			};

			var response = await GetAsync(new {marketId});
			return GetResponseModel<dynamic>(response);
		}

		public async Task<dynamic> UpdateCompetitionAsync(dynamic competition)
		{
			return new BaseFeed { Id = 1, Title = "Test Model" };

			var response = await PutAsync(competition);
			return GetResponseModel<dynamic>(response);
		}
	}
}
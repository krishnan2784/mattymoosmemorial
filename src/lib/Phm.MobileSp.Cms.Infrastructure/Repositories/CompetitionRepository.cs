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
			return new List<Competition>
			{
				new Competition { Id = 1, Title = "Test Model 1", CreatedAt = DateTime.Now, StartDate = DateTime.Now, Participants = 100},
				new Competition {Id = 2, Title = "Test Model 2", CreatedAt = DateTime.Now, EndDate = DateTime.Now, Participants = 1024},
				new Competition {Id = 3, Title = "Test Model 3", CreatedAt = DateTime.Now, StartDate = DateTime.Now, EndDate = DateTime.Now, Participants = 521}
			};

			var response = await GetAsync(new {marketId});
			return GetResponseModel<dynamic>(response);
		}

		public async Task<Competition> CreateCompetitionAsync(Competition competition)
		{
			return new Competition { Id = 1, Title = "Test Model", Participants = 100 };
			
			var response = await PostAsync(competition);
			return GetResponseModel<dynamic>(response);
		}

		public async Task<Competition> UpdateCompetitionAsync(Competition competition)
		{
			return new Competition { Id = 1, Title = "Test Model", Participants = 100};

			var response = await UpdateAsync(competition);
			return GetResponseModel<dynamic>(response);
		}
	}
}
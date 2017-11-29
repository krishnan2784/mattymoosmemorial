using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
	public class CompetitionRepository : BaseRepository, ICompetitionRepository
	{
		public CompetitionRepository(IHttpClientService client): base(client, "Competitions") {       }

		public async Task<dynamic> GetCompetitionAsync(int marketId)
		{
			var response = await GetAsync(new {marketId});
			return GetResponseModel<dynamic>(response);
		}

		public async Task<Competition> CreateCompetitionAsync(Competition competition)
		{
			var response = await PostAsync(competition);
			return GetResponseModel<Competition>(response);
		}

		public async Task<bool> UpdateCompetitionAsync(Competition competition)
		{
			var response = await PutAsync(competition);
			return GetResponseModel<bool>(response);
		}
	
		public async Task<bool> DeleteCompetitionAsync(int id)
		{
			var response = await DeleteAsync(id);
			return GetResponseModel<dynamic>(response);
		}
	}
}
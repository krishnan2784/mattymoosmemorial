using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
	public class CompetitionSubsetRepository : BaseRepository, ICompetitionSubsetRepository
	{
		public CompetitionSubsetRepository(IHttpClientService client): base(client, "SubsetCompetitions") {       }

		public async Task<List<CompetitionSubset>> GetCompetitionSubsetAsync(int marketId, DateTime searchDate)
		{
			var response = await GetAsync(new { marketId, searchDate });
			var r = GetResponseModel<List<CompetitionSubset>>(response);
			return r;
		}
	}
}
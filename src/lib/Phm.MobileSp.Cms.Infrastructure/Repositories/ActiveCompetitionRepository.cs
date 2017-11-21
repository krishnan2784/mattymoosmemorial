using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
	public class ActiveCompetitionRepository : BaseRepository, IActiveCompetitionRepository
	{
		public ActiveCompetitionRepository(IHttpClientService client): base(client, "Competitions") {       }

		public async Task<List<ActiveCompetition>> GetActiveCompetitionAsync(int marketId)
		{
			var response = await GetAsync(new {marketId});
			var r = GetResponseModel<List<Competition>>(response);
			var active = new List<ActiveCompetition>();

				active.AddRange(r.Where(x => x.EndDate > DateTime.Now).Select(x=> new ActiveCompetition
				{
					Id = x.Id,
					StartDate = x.StartDate,
					EndDate = x.EndDate,
					Title = x.Title,
					Participants = x.Participants,
				}));

			return active;
		}
	}
}
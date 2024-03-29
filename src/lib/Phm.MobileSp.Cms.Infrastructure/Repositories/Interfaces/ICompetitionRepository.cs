﻿using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ICompetitionRepository : IMarketContentRepository
	{
        Task<dynamic> GetCompetitionAsync(int marketId);
		Task<Competition> CreateCompetitionAsync(Competition competition);
		Task<bool> UpdateCompetitionAsync(Competition competition);
		Task<bool> DeleteCompetitionAsync(int id);
	}
}

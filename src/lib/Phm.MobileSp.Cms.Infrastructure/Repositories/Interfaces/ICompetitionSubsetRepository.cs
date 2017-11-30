using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ICompetitionSubsetRepository
	{
        Task<List<CompetitionSubset>> GetCompetitionSubsetAsync(int marketId, DateTime searchDate);
	}
}

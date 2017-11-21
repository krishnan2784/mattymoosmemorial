using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IActiveCompetitionRepository
	{
        Task<List<ActiveCompetition>> GetActiveCompetitionAsync(int marketId);
	}
}

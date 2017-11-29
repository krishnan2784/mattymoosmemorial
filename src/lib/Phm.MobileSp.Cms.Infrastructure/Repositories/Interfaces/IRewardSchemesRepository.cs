using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IRewardSchemesRepository
	{
        Task<dynamic> GetRewardSchemesAsync(int marketId);
		Task<BaseRewardScheme> CreateRewardSchemesAsync(BaseRewardScheme competition);
		Task<bool> UpdateRewardSchemesAsync(BaseRewardScheme competition);
		Task<bool> DeleteRewardSchemesAsync(int id);
	}
}

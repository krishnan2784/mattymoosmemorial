using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ITermsAndConditionsRepository
	{
        Task<dynamic> GetTermsAndConditionsAsync(int marketId);
		Task<TermsAndCondition> CreateTermsAndConditionsAsync(TermsAndCondition termsAndCondition);
		Task<bool> UpdateTermsAndConditionsAsync(TermsAndCondition termsAndCondition);
		Task<bool> DeleteTermsAndConditionsAsync(int id);
	}
}

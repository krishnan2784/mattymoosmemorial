using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
	public class TermsAndConditionsRepository : BaseRepository, ITermsAndConditionsRepository
	{
		public TermsAndConditionsRepository(IHttpClientService client): base(client, "TermsAndConditions") {       }

		public async Task<dynamic> GetTermsAndConditionsAsync(int marketId)
		{
			var response = await GetAsync(new {marketId});
			return GetResponseModel<dynamic>(response);
		}

		public async Task<TermsAndCondition> CreateTermsAndConditionsAsync(TermsAndCondition termsAndCondition)
		{
			var response = await PostAsync(termsAndCondition);
			return GetResponseModel<TermsAndCondition>(response);
		}

		public async Task<bool> UpdateTermsAndConditionsAsync(TermsAndCondition termsAndCondition)
		{
			var response = await PutAsync(termsAndCondition);
			return GetResponseModel<bool>(response);
		}
	
		public async Task<bool> DeleteTermsAndConditionsAsync(int id)
		{
			var response = await DeleteAsync(id);
			return GetResponseModel<dynamic>(response);
		}
	}
}
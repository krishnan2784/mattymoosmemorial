using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IMarketContentRepository
    {
	    Task<IEnumerable<Market>> GetMarketsById(int id);
		Task<BaseResponse<bool>> PublishContentToLive(int id);
        Task<BaseResponse<bool>> CopyToMarket(int id, List<int> marketIds);
	}
}

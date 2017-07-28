using Phm.MobileSp.Cms.Core.Models;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository
    {
        Task<BaseRepoResponse> GetAsync();
        Task<BaseRepoResponse> GetAsync(int id);
        Task<BaseRepoResponse> GetAsync(string request);
        Task<BaseRepoResponse> GetAsync(dynamic criteria);
        Task<BaseRepoResponse> GetAsync(string request, dynamic criteria);
        Task<BaseRepoResponse> CreateAsync(dynamic model);
        Task<BaseRepoResponse> UpdateAsync(dynamic model);
        Task<BaseRepoResponse> DeleteAsync(int id);
        Task<BaseRepoResponse> PostAsync(string request, dynamic model);
        Task<BaseRepoResponse> PutAsync(string request, dynamic model);
        BaseResponse<T> GetAPIResponse<T>(BaseRepoResponse response);
        T GetResponseModel<T>(BaseRepoResponse response);
    }
}
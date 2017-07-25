using Phm.MobileSp.Cms.Core.Models;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository
    {
        Task<BaseResponse> GetAsync();
        Task<BaseResponse> GetAsync(int id);
        Task<BaseResponse> GetAsync(dynamic criteria);
        Task<BaseResponse> CreateAsync(dynamic model);
        Task<BaseResponse> UpdateAsync(dynamic model);
        Task<BaseResponse> DeleteAsync(int id);
        Task<BaseResponse> PostAsync(dynamic model, string request);
        Task<BaseResponse> PutAsync(dynamic model, string request);
        void SetAuthToken(string authToken);
    }
}
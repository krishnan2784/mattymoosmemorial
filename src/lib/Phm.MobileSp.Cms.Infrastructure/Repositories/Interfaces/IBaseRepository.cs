using Phm.MobileSp.Cms.Core.Models;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository
    {
        Task<BaseResponse> GetAsync<T>();
        Task<BaseResponse> GetAsync<T>(int id);
        Task<BaseResponse> GetAsync<T>(string request);
        Task<BaseResponse> GetAsync<T>(dynamic criteria);
        Task<BaseResponse> GetAsync<T>(string request, dynamic criteria);
        Task<BaseResponse> CreateAsync<T>(dynamic model);
        Task<BaseResponse> UpdateAsync<T>(dynamic model);
        Task<BaseResponse> DeleteAsync<T>(int id);
        Task<BaseResponse> PostAsync<T>(string request, dynamic model);
        Task<BaseResponse> PutAsync<T>(string request, dynamic model);
    }
}
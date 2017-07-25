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
        Task<BaseResponse> GetAsync(string request);
        Task<BaseResponse> GetAsync(dynamic criteria);
        Task<BaseResponse> GetAsync(string request, dynamic criteria);
        Task<BaseResponse> CreateAsync(dynamic model);
        Task<BaseResponse> UpdateAsync(dynamic model);
        Task<BaseResponse> DeleteAsync(int id);
        Task<BaseResponse> PostAsync(string request, dynamic model);
        Task<BaseResponse> PutAsync(string request, dynamic model);
    }
}
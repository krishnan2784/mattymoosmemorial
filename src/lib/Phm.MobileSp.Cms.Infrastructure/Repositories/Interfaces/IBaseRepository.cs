using Phm.MobileSp.Cms.Core.Models;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository
    {
        Task<dynamic> GetAsync(string request);
        Task<dynamic> PostAsync(string request, dynamic model);
        Task<dynamic> CreateAsync(string request, dynamic model);
        Task<dynamic> UpdateAsync(string request, dynamic model);
        Task<bool> DeleteAsync(string request, int id);
        void SetAuthToken(string authToken);
    }
}
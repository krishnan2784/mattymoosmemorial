using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface IRegistrationRepository
    {
        Task<MLearningUser> GetUser(string userToken);
        Task<bool> UpdateUserPassword(int userId, string password);
    }
}

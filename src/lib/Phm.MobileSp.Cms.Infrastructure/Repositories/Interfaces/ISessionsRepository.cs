﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using System;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces
{
    public interface ISessionsRepository : IBaseRepository
    {
        Task<Tuple<ApplicationUser, string>> GetUserAsync(LoginDetails userDetails);
    }
}

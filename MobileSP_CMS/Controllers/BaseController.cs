﻿using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Cli.Utils;
using Microsoft.Extensions.Caching.Memory;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;
using MobileSP_CMS.Infrastructure;
using MobileSP_CMS.Infrastructure.Repositories.Interfaces;

namespace MobileSP_CMS.Controllers
{
    [Authorize]
    public class BaseController : Controller
    {
        private static string _AuthToken { get; set; }
        private static string _UserName { get; set; }
        private static int _CurrentMarketId { get; set; }
        private static int _UserId { get; set; }
        public IMemoryCache _cache;

        public BaseController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        public TService GetService<TService>()
        {
            return (TService)HttpContext.RequestServices.GetService(typeof(TService));
        }

        public TRepository GetRespository<TRepository>() where TRepository : IBaseRepository
        {
            var repo = (TRepository)HttpContext.RequestServices.GetService(typeof(TRepository));
            repo.BaseRequest = new BaseRequest { AccessToken = AuthToken };
            repo.RequestCriteria = new BaseCriteria { MarketId = CurrentMarketId };
            return repo;
        }

        public string AuthToken
        {
            get
            {
                if (string.IsNullOrEmpty(_AuthToken))
                {
                    _AuthToken = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "sessionguid").Value;
                }
                return _AuthToken;
            }
        }

        public string UserName
        {
            get {
                if (string.IsNullOrEmpty(_UserName))
                {
                    _UserName = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "name").Value;
                }
                return _UserName;
            }
        }

        public int CurrentMarketId
        {
            get
            {
                if (_CurrentMarketId == 0)
                {
                    _CurrentMarketId = Convert.ToInt16(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "currentmarketid").Value);
                }
                return _CurrentMarketId;
            }
            set
            {
                var identity = new ClaimsIdentity(User.Identity);
                identity.RemoveClaim(identity.FindFirst("currentmarketid"));
                identity.AddClaim(new Claim("currentmarketid", value.ToString()));
                _CurrentMarketId = value;
            }
        }

        public int UserId
        {
            get
            {
                if (_UserId == 0)
                {
                    _UserId = Convert.ToInt16(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userid").Value);
                }
                return _UserId;
            }
        }
    }
}

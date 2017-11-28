﻿using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Controllers
{
    public static class CacheKeys
    {
        public static List<string> AllKeys()
        {
            return new List<string>()
            {
                FEEDITEMS,
                USERLIST,
                USERMARKETS,
	            USERPERMISSIONS
			};
        }
 
        public const string FEEDITEMS = "FeedItems";
        public const string USERLIST = "UserList";
        public const string USERMARKETS = "UserMarkets";
        public const string USERPERMISSIONS = "UserPermissions";
	}
}
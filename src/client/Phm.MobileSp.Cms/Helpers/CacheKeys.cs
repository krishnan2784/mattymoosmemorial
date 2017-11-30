using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Helpers
{
    public static class CacheKeys
    {
	 //   public CacheKeys()
	 //   {
		//    AllKeys = new List<string>()
		//    {
		//	    FEEDITEMS,
		//	    USERLIST,
		//	    USERMARKETS,
		//	    USERPERMISSIONS
		//    };
		//}

	    //public void AddKey(string key)
	    //{
		   // AllKeys.Add(key);
	    //}

	    //public void ClearKeys()
	    //{
		   // AllKeys.Clear();
	    //}

	    public static List<string> AllKeys = new List<string>
	    {
		    FEEDITEMS,
		    USERLIST,
		    USERMARKETS,
		    USERPERMISSIONS
	    };

		public const string FEEDITEMS = "FeedItems";
        public const string USERLIST = "UserList";
        public const string USERMARKETS = "UserMarkets";
        public const string USERPERMISSIONS = "UserPermissions";
	}
}
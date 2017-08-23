using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Infrastructure
{
    public interface IHttpClientService
    {
        HttpClient _client { get; }
        void SetAuthToken(string authToke);
    }
}

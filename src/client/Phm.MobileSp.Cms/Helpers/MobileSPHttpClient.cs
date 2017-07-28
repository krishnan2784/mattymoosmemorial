using System;
using System.Net.Http;
using Microsoft.Extensions.Options;
using Phm.MobileSp.Cms.Core.Models;
using System.Net.Http.Headers;
using Phm.MobileSp.Cms.Infrastructure;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace Phm.MobileSp.Cms.Helpers
{
    public class MobileSPHttpClient : IHttpClientService
    {
        public HttpClient _client { get; }

        public MobileSPHttpClient(IOptions<ConnectionStrings> connStrings, IHttpContextAccessor context, IServiceProvider serviceProvider)
        {
            if (_client == null)
            {
                _client = new HttpClient();
                _client.DefaultRequestHeaders.Accept.Clear();
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                _client.BaseAddress = new Uri(connStrings.Value.API);

                var authToken = context.HttpContext?.User.Claims.FirstOrDefault(x => x.Type == "sessionguid").Value;
                if (!string.IsNullOrEmpty(authToken))
                    SetAuthToken(authToken);
            }

        }

        public void SetAuthToken(string authToken)
        {
            if (!string.IsNullOrWhiteSpace(authToken))
            {
                _client.DefaultRequestHeaders.Add("Authorization", authToken);
                _client.DefaultRequestHeaders.Add("AccessToken", authToken);
            }
        }
    }
}

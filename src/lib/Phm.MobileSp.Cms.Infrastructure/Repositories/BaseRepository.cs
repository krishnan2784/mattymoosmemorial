using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class BaseRepository : IBaseRepository
    {
        private string _connString {
            get { return _client.BaseAddress.ToString(); }
            set { _client.BaseAddress = new Uri($"{_connStrings.API}{value}/".Trim('/')); }
        }
        private HttpClient _client = new HttpClient();
        private ConnectionStrings _connStrings;
        private IBaseRequest _baseRequest;
        private IBaseCriteria _baseCriteria;

        protected BaseRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria,  string repoUrl)
        {
            _connStrings = connStrings.Value;
            _connString = $"{_connStrings.API}{repoUrl}".Trim('/');
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _baseRequest = baseRequest;
            _baseCriteria = baseCriteria;
        }
        
        public async Task<dynamic> GetAsync(string request)
        {
            ValidateRquest();
            dynamic model = null;
            HttpResponseMessage response = await _client.GetAsync(request);
            if (response.IsSuccessStatusCode)
            {
                model = await response.Content.ReadAsStreamAsync();
            }
            return model;
        }

        public async Task<dynamic> CreateAsync(string request, dynamic model)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.PutAsync($"{request}", model);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStreamAsync();
        }
        public async Task<dynamic> PostAsync(string request, dynamic model)
        {
            ValidateRquest();

            HttpResponseMessage response = await _client.PostAsync($"{request}", GetRequestBody(model));
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStreamAsync();
        }

        public async Task<dynamic> UpdateAsync(string request, dynamic model)
        {
            try
            {
                ValidateRquest();
                HttpResponseMessage response = await _client.PostAsync($"/{model.Id}", GetRequestBody(model));
                response.EnsureSuccessStatusCode();            
                model = await response.Content.ReadAsStreamAsync();
                return model;
            } catch (Exception e)
            {
                return null;
            }
        }

        public async Task<bool> DeleteAsync(string request, int id)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.DeleteAsync($"{request}/{id}");
            return response.StatusCode == HttpStatusCode.OK;
        }

        private void ValidateRquest()
        {
            if (!string.IsNullOrWhiteSpace(_baseRequest.AccessToken))
            {
                _client.DefaultRequestHeaders.Add("Authorization", _baseRequest.AccessToken);
                _client.DefaultRequestHeaders.Add("AccessToken", _baseRequest.AccessToken);
            }
        }

        public JsonContent GetRequestBody(dynamic model)
        {
            try
            {
                model = new JsonContent(model);
            } catch { }
            return model;
        }

        public void SetAuthToken(string authToken)
        {
            _baseRequest.AccessToken = authToken;
        }
    }
    public class JsonContent : StringContent
    {
        public JsonContent(object obj) : base(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json") { }
    }
}
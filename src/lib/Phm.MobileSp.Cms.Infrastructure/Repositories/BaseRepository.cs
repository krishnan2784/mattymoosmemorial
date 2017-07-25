using AutoMapper;
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
        private HttpClient _client = new HttpClient();
        private ConnectionStrings _connStrings;
        private IBaseRequest _baseRequest;
        private IBaseCriteria _baseCriteria;
        private string _repoUrl;

        protected BaseRepository(IOptions<ConnectionStrings> connStrings, IBaseRequest baseRequest, IBaseCriteria baseCriteria,  
            string repoUrl)
        {
            _connStrings = connStrings.Value;
            _repoUrl = repoUrl;
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _client.BaseAddress = new Uri(_connStrings.API);
            _baseRequest = baseRequest;
            _baseCriteria = baseCriteria;
        }

        public async Task<BaseResponse> GetAsync()
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.GetAsync(_repoUrl);
            return await GetResponse(response);
        }

        public async Task<BaseResponse> GetAsync(int id)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.GetAsync($"{_repoUrl}/{ id}");
            return await GetResponse(response, false);
        }

        public async Task<BaseResponse> GetAsync(string request)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.GetAsync(request);
            return await GetResponse(response, false);
        }

        public async Task<BaseResponse> GetAsync(dynamic criteria)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.GetAsync(_repoUrl, GetRequestBody(criteria));
            return await GetResponse(response, false);
        }

        public async Task<BaseResponse> GetAsync(string request, dynamic criteria)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.GetAsync(request, GetRequestBody(criteria));
            return await GetResponse(response, false);
        }
        
        public async Task<BaseResponse> CreateAsync(dynamic model)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.PostAsync(_repoUrl, model);
            return await GetResponse(response);
        }

        public async Task<BaseResponse> UpdateAsync(dynamic model)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.PutAsync($"{_repoUrl}/{model.Id}", GetRequestBody(model));
            return await GetResponse(response);
        }

        public async Task<BaseResponse> DeleteAsync(int id)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.DeleteAsync($"{_repoUrl}/{id}");
            return await GetResponse(response);
        }

        public async Task<BaseResponse> PostAsync(dynamic model)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.PostAsync(_repoUrl, GetRequestBody(model));
            return await GetResponse(response);
        }

        public async Task<BaseResponse> PostAsync(string request, dynamic model)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.PostAsync(request, GetRequestBody(model));
            return await GetResponse(response);
        }

        public async Task<BaseResponse> PutAsync(dynamic model)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.PutAsync($"{_repoUrl}/{model.Id}", GetRequestBody(model));
            return await GetResponse(response);
        }

        public async Task<BaseResponse> PutAsync(string request, dynamic model)
        {
            ValidateRquest();
            HttpResponseMessage response = await _client.PutAsync($"{request}/{model.Id}", GetRequestBody(model));
            return await GetResponse(response);
        }

        private void ValidateRquest()
        {
            if (!string.IsNullOrWhiteSpace(_baseRequest.AccessToken))
            {
                _client.DefaultRequestHeaders.Add("Authorization", _baseRequest.AccessToken);
                _client.DefaultRequestHeaders.Add("AccessToken", _baseRequest.AccessToken);
            }
        }

        private async Task<BaseResponse> GetResponse(HttpResponseMessage response, bool ensureSuccess = true)
        {
            if (ensureSuccess)
                response.EnsureSuccessStatusCode();

            dynamic model = null;
            var success = response.IsSuccessStatusCode;
            if (success)
            {
                model = await response.Content.ReadAsStreamAsync();
            }
            return new BaseResponse(success, "", model);
        }

        public JsonContent GetRequestBody(dynamic model)
        {
            try
            {
                model = new JsonContent(model);
            } catch { }
            return model;
        }
    }
    public class JsonContent : StringContent
    {
        public JsonContent(object obj) : base(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json") { }
    }
}
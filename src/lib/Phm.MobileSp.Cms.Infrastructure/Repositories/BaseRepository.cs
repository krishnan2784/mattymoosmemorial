using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
        public IHttpClientService _clientService;
        private HttpClient _client { get { return _clientService._client; } }
        private string _repoUrl;

        protected BaseRepository(IHttpClientService clientService, string repoUrl)
        {
            _clientService = clientService;
            _repoUrl = repoUrl;
        }

        public async Task<BaseRepoResponse> GetAsync()
        {
            HttpResponseMessage response = await _client.GetAsync(_repoUrl);
            return await GetResponse(response);
        }

        public async Task<BaseRepoResponse> GetAsync(int id)
        {
            HttpResponseMessage response = await _client.GetAsync($"{_repoUrl}/{ id}");
            return await GetResponse(response, false);
        }

        public async Task<BaseRepoResponse> GetAsync(string request)
        {
            HttpResponseMessage response = await _client.GetAsync(request);
            return await GetResponse(response, false);
        }

        public async Task<BaseRepoResponse> GetAsync(dynamic criteria)
        {
            HttpResponseMessage response = await _client.PostAsync(_repoUrl, GetRequestBody(criteria));
            return await GetResponse(response, false);
        }

        public async Task<BaseRepoResponse> GetAsync(string request, dynamic criteria)
        {
            HttpResponseMessage response = await _client.PostAsync(request, GetRequestBody(criteria));
            return await GetResponse(response, false);
        }
        
        public async Task<BaseRepoResponse> CreateAsync(dynamic model)
        {
            HttpResponseMessage response = await _client.PostAsync(_repoUrl, model);
            return await GetResponse(response);
        }

        public async Task<BaseRepoResponse> UpdateAsync(dynamic model)
        {
            HttpResponseMessage response = await _client.PutAsync($"{_repoUrl}/{model.Id}", GetRequestBody(model));
            return await GetResponse(response);
        }

        public async Task<BaseRepoResponse> DeleteAsync(int id)
        {
            HttpResponseMessage response = await _client.DeleteAsync($"{_repoUrl}/{id}");
            return await GetResponse(response);
        }

        public async Task<BaseRepoResponse> PostAsync(dynamic model)
        {
            HttpResponseMessage response = await _client.PostAsync(_repoUrl, GetRequestBody(model));
            return await GetResponse(response);
        }

        public async Task<BaseRepoResponse> PostAsync(string request, dynamic model)
        {
            HttpResponseMessage response = await _client.PostAsync(request, GetRequestBody(model));
            return await GetResponse(response);
        }

        public async Task<BaseRepoResponse> PutAsync(dynamic model)
        {
            HttpResponseMessage response = await _client.PutAsync($"{_repoUrl}/{model.Id}", GetRequestBody(model));
            return await GetResponse(response);
        }

        public async Task<BaseRepoResponse> PutAsync(string request, dynamic model)
        {
            HttpResponseMessage response = await _client.PutAsync($"{request}/{model.Id}", GetRequestBody(model));
            return await GetResponse(response);
        }

        private async Task<BaseRepoResponse> GetResponse(HttpResponseMessage response, bool ensureSuccess = true)
        {
            //if (ensureSuccess)
            //    response.EnsureSuccessStatusCode();
            
            var success = response.IsSuccessStatusCode;
            string message = "";

            var responseString = await response.Content.ReadAsStringAsync();
            if (!success && !string.IsNullOrEmpty(responseString))
            {
                try
                {
                    message = ((dynamic)JsonConvert.DeserializeObject(responseString)).Message;
                } catch (Exception e)
                {
                }
            }
            return new BaseRepoResponse(success, message, responseString);
        }

        public T GetResponseModel<T>(BaseRepoResponse response)
        {
            if (!response.Success)
                return (T)Activator.CreateInstance(typeof(T));
            else
                return JsonConvert.DeserializeObject<T>(response.StringifiedObject);
        }

        public BaseResponse<T> GetAPIResponse<T>(BaseRepoResponse response)
        {
            return new BaseResponse<T>(response.Success, response.Message, GetResponseModel<T>(response));
        }

        public BaseResponse<T> GetAPIResponse<T>(BaseRepoResponse response, string successMessage="", string failMessage="")
        {
            if (response.Success && !string.IsNullOrEmpty(successMessage))
                response.Message = successMessage;
            else if (!string.IsNullOrEmpty(failMessage))
                response.Message = successMessage;

            return new BaseResponse<T>(response.Success, response.Message, GetResponseModel<T>(response));
        }

        public dynamic GetRequestBody(dynamic model)
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
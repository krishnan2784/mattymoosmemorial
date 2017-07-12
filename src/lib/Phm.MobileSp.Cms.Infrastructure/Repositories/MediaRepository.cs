using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MobileSPCoreService;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Infrastructure;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.WindowsAzure.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class MediaRepository : CoreBaseRepository, IMediaRepository
    {
        private readonly ICoreContract _proxyClient;
        private readonly IConfigurationRoot _config;
        public MediaRepository(ICoreContract proxyClient, IBaseRequest baseRequest, IBaseCriteria baseCriteria)
            : base(baseRequest, baseCriteria)
        {
            _proxyClient = proxyClient;
            var builder = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();
            _config = builder.Build();
        }

        public async Task<MediaInfo> UploadImage(IFormFile image)
        {
            try
            {
                var connectionString = _config["MicrosoftAzureStorage:mobilespstagingstorage_AzureStorageConnectionString"];
                var containerRoot = _config["MicrosoftAzureStorage:containerRoot"];
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
                var blobClient = storageAccount.CreateCloudBlobClient();
                var container = blobClient.GetContainerReference(containerRoot);
                var parsedContentDisposition =
                    ContentDispositionHeaderValue.Parse(image.ContentDisposition);
                var filename = Path.Combine(parsedContentDisposition.FileName.Trim('"'));
                var blockBlob = container.GetBlockBlobReference(filename);
                await blockBlob.UploadFromStreamAsync(image.OpenReadStream());
                return new MediaInfo() { Name = filename, Path = $"{storageAccount.BlobStorageUri.PrimaryUri.AbsoluteUri}{containerRoot}/"};
            } catch (Exception e)
            {
                return null;
            }
        }
    }
}

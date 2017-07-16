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

        public async Task<MediaInfo> UploadFile(IFormFile file)
        {
            MediaTypes type = MediaTypes.Image;
            switch (file.ContentType)
            {
                case "video/mp4":
                    type = MediaTypes.Video;
                    break;
                case "image/jpeg":
                case "image/png":
                    type = MediaTypes.Image;
                    break;
                default:
                    return new MediaInfo();
            }
            try
            {
                var connectionString = _config["MicrosoftAzureStorage:mobilespstagingstorage_AzureStorageConnectionString"];
                var containerRoot = _config["MicrosoftAzureStorage:containerRoot"];
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
                var blobClient = storageAccount.CreateCloudBlobClient();
                var container = blobClient.GetContainerReference(containerRoot);
                var parsedContentDisposition =
                    ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                var filename = Path.Combine(parsedContentDisposition.FileName.Trim('"'));
                var blockBlob = container.GetBlockBlobReference(filename);
                await blockBlob.UploadFromStreamAsync(file.OpenReadStream());

                return new MediaInfo() { Name = filename,
                    Path = $"{storageAccount.BlobStorageUri.PrimaryUri.AbsoluteUri}{containerRoot}/",
                    MediaType = type};
            } catch (Exception e)
            {
                return new MediaInfo();
            }
        }
    }
}

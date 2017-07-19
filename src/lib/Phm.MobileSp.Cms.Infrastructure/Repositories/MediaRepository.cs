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
        public MediaRepository(IBaseRepository baseRepo, ICoreContract proxyClient)
            : base(baseRepo)
        {
            _proxyClient = proxyClient;
            var builder = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();
            _config = builder.Build();
        }

        public async Task<MediaInfoDto> UploadFile(IFormFile file, Market currentMarket)
        {
            try
            {
                var marketName = currentMarket.Name.Replace(" ", "_").Replace("(", "_").Replace(")", "_");

                var connectionString = _config["MicrosoftAzureStorage:mobilespstagingstorage_AzureStorageConnectionString"];
                var containerRoot = _config["MicrosoftAzureStorage:containerRoot"];
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
                var blobClient = storageAccount.CreateCloudBlobClient();
                var container = blobClient.GetContainerReference($"{containerRoot}/FordGlobal/{marketName}");
                var parsedContentDisposition =
                    ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                var filename = Path.Combine(parsedContentDisposition.FileName.Trim('"'));
                var blockBlob = container.GetBlockBlobReference(filename);
                await blockBlob.UploadFromStreamAsync(file.OpenReadStream());

                var mediaInfoDto = GenerateMediaInfoDto(filename, storageAccount.BlobStorageUri.PrimaryUri.AbsoluteUri, containerRoot,
                    file.ContentType, "FordGlobal", marketName, currentMarket.Id, file.Length);

                var response = await _proxyClient.CreateMediaInfoAsync(GetRequest(new CreateMediaInfoRequest
                {
                    CurrentMediInfo = mediaInfoDto
                }));

                return response.CurrentMediInfo;
            } catch (Exception e)
            {
                return new MediaInfoDto();
            }
        }
        private MediaInfoDto GenerateMediaInfoDto(string fileName, string defaultUrl, string containerRoot, string contentType, string brandName, string marketName, int marketId, long fileSize)
        {
            var mediaItem = new MediaInfoDto
            {
                Name = fileName,
                AzureUrl =
                    $"{ defaultUrl }{ containerRoot }/{brandName}/{marketName}/{fileName}",
                MediaType = GetMediaType(contentType),
                MarketId = marketId,
                MediaId = fileName,
                MediaVersion = 0,
                Path = $"{brandName}/{marketName}/",
                Size =fileSize,
                Extension = fileName.Substring(fileName.LastIndexOf(".") + 1, fileName.Length - (fileName.LastIndexOf(".") + 1))
            };
            return mediaItem;
        }
        private MediaTypesDto GetMediaType(string contentType)
        {
            switch (contentType.ToLower())
            {
                case "image/png":
                case "image/jpeg":
                case "image/jpg":
                    return MediaTypesDto.Image;
                case "video/mp4":
                    return MediaTypesDto.Video;
                case "application/pdf":
                    return MediaTypesDto.File;
                default:
                    return MediaTypesDto.Text;
            }
        }
    }
}

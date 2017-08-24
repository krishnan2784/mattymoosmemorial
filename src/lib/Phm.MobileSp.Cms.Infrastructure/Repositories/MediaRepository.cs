using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Phm.MobileSp.Cms.Core.Enumerations;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Infrastructure.Utilities;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Security;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Infrastructure.Repositories
{
    public class MediaRepository : BaseRepository, IMediaRepository
    {
        private readonly TelemetryClient _errorClient = new TelemetryClient();
        private readonly IMediaInfoRepository _mediaInfoRepo;

        public MediaRepository(IOptions<MicrosoftAzureStorage> azureConnStrings, IHttpClientService client, IMediaInfoRepository mediaInfoRepo) : base(client, "")
        {
            AzureConnStrings = azureConnStrings.Value;
            _mediaInfoRepo = mediaInfoRepo;
        }

        private MicrosoftAzureStorage AzureConnStrings { get; }

        //Todo: Please Add Brand Name for better segregation of user data
        public async Task<MediaInfo> UploadFile(IFormFile file, Market currentMarket)
        {
            try
            {
                var container = GetCloudBlobContainer(currentMarket, false);
                var parsedContentDisposition = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                container = container.SetFileDetails(Path.Combine(parsedContentDisposition.FileName.Trim('"')), VerifyCorrectMimeType(file), file.Length);

                await UploadFileToStorage(file, container);

                return await GenerateMediaInfoDtoForResponse(container);
            }
            catch (Exception e)
            {
                return ProcessUploadException(e);
            }
        }

        //Todo: Please Add Brand Name for better segregation of user data
        public async Task<MediaInfo> UploadPreviewImage(IFormFile file, string fileName, Market currentMarket)
        {
            try
            {
                var container = GetCloudBlobContainer(currentMarket, true);
                container = container.SetFileDetails(fileName, VerifyCorrectMimeType(file), file.Length);
                await UploadFileToStorage(file, container);
                return await GenerateMediaInfoDtoForResponse(container);
            }
            catch (Exception e)
            {
                return ProcessUploadException(e);
            }
        }

        private MediaInfo GenerateMediaInfoDto(CloudContainerDetails containerDetails)
        {
            var mediaItem = new MediaInfo
            {
                Name = containerDetails.FileName,
                AzureUrl =
                    $"{ containerDetails.StorageAccountUri }{containerDetails.Container.Name}/{containerDetails.FileName}",
                MediaType = GetMediaType(containerDetails.MimeType),
                MarketId = containerDetails.CurrentMarketId,
                MediaId = containerDetails.FileName,
                MediaVersion = 0,
                Path = $"{containerDetails.BrandName}/{containerDetails.MarketName}/",
                Size = containerDetails.FileSize,
                Extension = Path.GetExtension(containerDetails.FileName)
            };
            return mediaItem;
        }

        private async Task<MediaInfo> GenerateMediaInfoDtoForResponse(CloudContainerDetails containerDetails)
        {
            var mediaInfoDto = GenerateMediaInfoDto(containerDetails);
            var response = await _mediaInfoRepo.CreateMediaInfo(mediaInfoDto);
            return response;
        }

        private CloudContainerDetails GetCloudBlobContainer(Market market, bool isPreviewItem)
        {
            var storageAccount = CloudStorageAccount.Parse(AzureConnStrings.ConnectionString);
            var blobClient = storageAccount.CreateCloudBlobClient();
            var foldername = GetFolderLocation(market.Name.Replace(" ", "_").Replace("(", "_").Replace(")", "_"), isPreviewItem);

            var detail = new CloudContainerDetails
            {
                MarketName = market.Name.Replace(" ", "_").Replace("(", "_").Replace(")", "_"),
                CurrentMarketId = market.Id,
                BrandName = "FordGlobal", // Todo: Add Brand to contructor of public Upload Methods then pass the name to this value.
                ContainerRoot = AzureConnStrings.ContainerRoot,
                StorageAccountUri = storageAccount.BlobStorageUri.PrimaryUri.AbsoluteUri,
                Container = blobClient.GetContainerReference($"{AzureConnStrings.ContainerRoot}/FordGlobal/{foldername}")
            };
            return detail;
        }

        private string GetFolderLocation(string market, bool isPreviewItem)
        {
            if (isPreviewItem)
                return market + "/Preview";
            return market;
        }

        private MediaTypes GetMediaType(string contentType)
        {
            switch (contentType.ToLower())
            {
                case "image/png":
                case "image/jpeg":
                case "image/jpg":
                    return MediaTypes.Image;

                case "video/mp4":
                    return MediaTypes.Video;

                case "application/pdf":
                    return MediaTypes.File;

                default:
                    return MediaTypes.Text;
            }
        }

        private MediaInfo ProcessUploadException(Exception e)
        {
            _errorClient.TrackException(e);
            return new MediaInfo();
        }

        private async Task UploadFileToStorage(IFormFile file, CloudContainerDetails containerDetails)
        {
            var blockBlob = containerDetails.Container.GetBlockBlobReference(containerDetails.FileName);
            blockBlob.Properties.ContentType = containerDetails.MimeType;
            await blockBlob.UploadFromStreamAsync(file.OpenReadStream());
        }

        private string VerifyCorrectMimeType(IFormFile file)
        {
            var parsedContentDisposition = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
            var mimeType = file.GetMimeType(parsedContentDisposition.FileName.Trim('"'));
            if (file.ContentType != mimeType) throw new SecurityException("Mime types must match");
            return mimeType;
        }
    }
}
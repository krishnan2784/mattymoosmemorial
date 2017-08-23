using Microsoft.WindowsAzure.Storage.Blob;

namespace Phm.MobileSp.Cms.Infrastructure
{
    public struct CloudContainerDetails
    {
        public string BrandName { get; set; }
        public CloudBlobContainer Container { get; set; }
        public string ContainerRoot { get; set; }
        public int CurrentMarketId { get; set; }
        public string FileName { get; set; }
        public long FileSize { get; set; }
        public string MarketName { get; set; }
        public string MimeType { get; set; }
        public string StorageAccountUri { get; set; }
    }

}

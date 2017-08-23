namespace Phm.MobileSp.Cms.Infrastructure.Utilities
{
    public static class FileUploadUtility
    {
        public static CloudContainerDetails SetFileDetails(this CloudContainerDetails container, string fileName, string fileMimeType, long fileSize)
        {
            container.FileName = fileName;
            container.MimeType = fileMimeType;
            container.FileSize = fileSize;
            return container;
        }
    }
}

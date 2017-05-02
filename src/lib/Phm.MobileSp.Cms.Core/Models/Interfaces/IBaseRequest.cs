namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface IBaseRequest
    {
        string AccessToken { get; set; }
        string CurrentCulture { get; set; }
        string CurrentUiCulture { get; set; }
    }
}

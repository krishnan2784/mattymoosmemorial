namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface ILoginDetails 
    {
        string UserName { get; set; }
        string Password { get; set; }
        bool RememberMe { get; set; }
    }
}

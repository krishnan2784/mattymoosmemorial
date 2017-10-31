namespace Phm.MobileSp.Cms.Core.Models
{
    public class PasswordSetCriteria : BaseFeed
    {
	    public string RegistrationHash { get; set; }
	    public string UserEmail { get; set; }
	    public string Password { get; set; }
	    public string ConfirmPassword { get; set; }
	}
}

using Microsoft.AspNetCore.Mvc;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Phm.MobileSp.Cms.Models.ViewModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Controllers
{
    public class RegistrationController : Controller
    {
        IRegistrationRepository RegistrationRepo { get; }
        public RegistrationController(IRegistrationRepository registrationRepository) => RegistrationRepo = registrationRepository;

        public async Task<IActionResult> Index(string token = "")
        {
            var user = await RegistrationRepo.GetUser(token);
            if (user == null || user.Id == 0)
                return RedirectToAction("Error");

            var model = new UserRegistrationViewModel()
            {
                Id = user.Id,
                FirstName = user.FirstName,
	            RegistrationHash = token,
				UserEmail = user.Email
			};

            return View(model);            
        }

        public async Task<JsonResult> UpdatePassword([FromForm]UserRegistrationViewModel user)
        {
            bool isValid = Validator.TryValidateObject(
                user,
                new ValidationContext(user, null, null),
                new List<ValidationResult>(),
                true);

            var success = false;

            if(isValid)
                success = await RegistrationRepo.UpdateUserPassword(new PasswordSetCriteria()
	                {
		                RegistrationHash = user.RegistrationHash,
		                UserEmail = user.UserEmail,
		                Password = user.Password,
		                ConfirmPassword = user.ConfirmationPassword
				});

            var message = success ? "You have completed your registration. You can now log in to mLearning." :
                "An error has occurrred. Please try again.";

            return Json(new BaseResponse<bool>(success, message, success));
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}

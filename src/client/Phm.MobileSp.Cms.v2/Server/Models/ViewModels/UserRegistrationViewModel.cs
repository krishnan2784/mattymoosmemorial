using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Phm.MobileSp.Cms.Helpers.Attributes.Validation;

namespace Phm.MobileSp.Cms.Server.Models.ViewModels
{
    public class UserRegistrationViewModel : IValidatableObject
    {
        [Required]
        public int Id { get; set; }
        public string FirstName { get; set; }

        [Required]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$",
            ErrorMessage = "You password must be between 8 and 15 characters long, and contain a lowercase character, an uppercase character, and a number.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        
        [PasswordValidation]
        [DataType(DataType.Password)]
        public string ConfirmationPassword { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Password.Length < 8 || Password.Length > 15)
                yield return new ValidationResult(
                    $"Your password must be between 8 and 15 characters long.",
                    new[] { "Password" });

            bool hasUpperCaseLetter = false;
            bool hasLowerCaseLetter = false;
            bool hasDecimalDigit = false;

            foreach (char c in Password)
            {
                if (char.IsUpper(c)) hasUpperCaseLetter = true;
                else if (char.IsLower(c)) hasLowerCaseLetter = true;
                else if (char.IsDigit(c)) hasDecimalDigit = true;
            }

            if (!hasUpperCaseLetter || !hasLowerCaseLetter)
                yield return new ValidationResult(
                    $"Your password must contain at least one uppercase and one lowercase character.",
                    new[] { "Password" });

            if (!hasDecimalDigit)
                yield return new ValidationResult(
                    $"Your password must contain at least one number.",
                    new[] { "Password" });

            if (Password != ConfirmationPassword)
                yield return new ValidationResult(
                    $"The passwords entered do not match.",
                    new[] { "ConfirmationPassword" });

            yield return ValidationResult.Success;
        }
    }
}

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Phm.MobileSp.Cms.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Phm.MobileSp.Cms.Helpers.Attributes.Validation
{
    public class PasswordValidationAttribute : ValidationAttribute
    {
        public PasswordValidationAttribute()
        {
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var user = (UserRegistrationViewModel)validationContext.ObjectInstance;

            if (user.Password != user.ConfirmationPassword)
                return new ValidationResult("The passwords entered do not match.");
            return ValidationResult.Success;
        }
    }
}

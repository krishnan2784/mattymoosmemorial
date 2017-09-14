"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormEx = (function () {
    function FormEx() {
    }
    FormEx.getFormValidationErrors = function (form) {
        var _this = this;
        if (!form || !form.controls)
            return [];
        var errArray = [];
        Object.keys(form.controls).forEach(function (key) {
            var c = form.get(key);
            if (c.controls) {
                var childErrors = _this.getFormValidationErrors(c);
                errArray.concat(childErrors);
            }
            else {
                var controlErrors = c.errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(function (keyError) {
                        errArray.push(c);
                        //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ' + controlErrors[keyError]);
                    });
                }
            }
        });
        return errArray;
    };
    return FormEx;
}());
exports.FormEx = FormEx;
//# sourceMappingURL=form.js.map
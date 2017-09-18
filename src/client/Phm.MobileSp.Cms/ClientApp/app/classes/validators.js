"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmptyInputValue(value) {
    return value == null || typeof value === 'string' && value.length === 0;
}
function minValue(min) {
    return function (control) {
        if (isEmptyInputValue(control.value)) {
            return null;
        }
        var input = control.value, isValid = input >= min;
        if (!isValid)
            return { 'minValue': { min: min } };
        else
            return null;
    };
}
exports.minValue = minValue;
function maxValue(max) {
    return function (control) {
        var input = control.value, isValid = input <= max;
        if (!isValid)
            return { 'maxValue': { max: max } };
        else
            return null;
    };
}
exports.maxValue = maxValue;
function minCorrectAnswers(min) {
    return function (form) {
        var c = 0;
        var a = form.controls['answers'];
        for (var i = 0; i < a.controls.length; i++) {
            var fg = a.controls[i];
            if (fg.controls['isCorrect'].value == true) {
                c++;
            }
        }
        if (c >= min)
            return null;
        return { 'minCorrect': { min: min } };
    };
}
exports.minCorrectAnswers = minCorrectAnswers;
function validEmailAddress() {
    return function (control) {
        var emailRx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
        if (control.value != "" && (control.value.length <= 5 || !emailRx.test(control.value))) {
            return { "invalidEmailAddress": true };
        }
        return null;
    };
}
exports.validEmailAddress = validEmailAddress;
function validUserRole() {
    return function (control) {
        var c = control.value;
        if (c !== null && c.name != null && c.name !== "") {
            return null;
        }
        return { "invalidUserRole": true };
    };
}
exports.validUserRole = validUserRole;
function minLengthArray(min) {
    return function (c) {
        if (c.value.length >= min)
            return null;
        return { 'minLengthArray': { valid: false } };
    };
}
exports.minLengthArray = minLengthArray;
//# sourceMappingURL=validators.js.map
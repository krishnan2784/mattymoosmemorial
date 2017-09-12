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
function minLengthArray(min) {
    return function (c) {
        if (c.value.length >= min)
            return null;
        return { 'minLengthArray': { valid: false } };
    };
}
exports.minLengthArray = minLengthArray;
//# sourceMappingURL=validators.js.map
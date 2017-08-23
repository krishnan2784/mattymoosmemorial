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
//# sourceMappingURL=validators.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberEx = (function () {
    function NumberEx() {
    }
    NumberEx.pad = function (num, size, character, padLeft) {
        if (character === void 0) { character = "0"; }
        if (padLeft === void 0) { padLeft = true; }
        var s = num + "";
        if (padLeft)
            while (s.length < size)
                s = character + s;
        else
            while (s.length < size)
                s = s + character;
        return s;
    };
    return NumberEx;
}());
exports.NumberEx = NumberEx;
//# sourceMappingURL=number.js.map
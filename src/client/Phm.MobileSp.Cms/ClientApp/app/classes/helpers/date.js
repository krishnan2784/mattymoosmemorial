"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Number1 = require("./number");
var NumberEx = Number1.NumberEx;
var DateEx = (function () {
    function DateEx() {
    }
    DateEx.formatDate = function (date) {
        if (!date)
            date = new Date();
        return date.getFullYear() + "-" + NumberEx.pad((date.getMonth() + 1), 2) + "-" + NumberEx.pad(date.getDate(), 2);
    };
    return DateEx;
}());
exports.DateEx = DateEx;
//# sourceMappingURL=date.js.map
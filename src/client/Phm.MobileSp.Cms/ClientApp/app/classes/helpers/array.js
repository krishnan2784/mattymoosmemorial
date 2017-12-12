"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayEx = (function () {
    function ArrayEx() {
    }
    ArrayEx.sumArrayValues = function (items, prop) {
        if (items == null) {
            return 0;
        }
        return items.reduce(function (a, b) {
            return b[prop] == null ? a : a + b[prop];
        }, 0);
    };
    ;
    return ArrayEx;
}());
exports.ArrayEx = ArrayEx;
//# sourceMappingURL=array.js.map
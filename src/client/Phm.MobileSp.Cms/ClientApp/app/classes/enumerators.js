"use strict";
var EnumEx = (function () {
    function EnumEx() {
    }
    EnumEx.getNamesAndValues = function (e) {
        return EnumEx.getNames(e).map(function (n) { return ({ name: n, value: e[n] }); });
    };
    EnumEx.getNames = function (e) {
        return EnumEx.getObjValues(e).filter(function (v) { return typeof v === "string"; });
    };
    EnumEx.getValues = function (e) {
        return EnumEx.getObjValues(e).filter(function (v) { return typeof v === "number"; });
    };
    EnumEx.getObjValues = function (e) {
        return Object.keys(e).map(function (k) { return e[k]; });
    };
    return EnumEx;
}());
exports.EnumEx = EnumEx;
//# sourceMappingURL=enumerators.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Apiresponse = require("../../models/apiresponse");
var ApiResponse = Apiresponse.ApiResponse;
var ResponseHelper = (function () {
    function ResponseHelper() {
    }
    ResponseHelper.getResponse = function (response) {
        response = new ApiResponse(response.json());
        return response;
    };
    ResponseHelper.toCamel = function (o) {
        if (o === null)
            return o;
        var newO, origKey, newKey, value;
        if (o instanceof Array) {
            newO = [];
            for (origKey in o) {
                value = o[origKey];
                if (value !== null && typeof value === "object") {
                    value = this.toCamel(value);
                }
                newO.push(value);
            }
        }
        else {
            newO = {};
            for (origKey in o) {
                if (o.hasOwnProperty(origKey)) {
                    newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
                    value = o[origKey];
                    if (value !== null && value.constructor === Object) {
                        value = this.toCamel(value);
                    }
                    newO[newKey] = value;
                }
            }
        }
        return newO;
    };
    return ResponseHelper;
}());
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=responsehelper.js.map
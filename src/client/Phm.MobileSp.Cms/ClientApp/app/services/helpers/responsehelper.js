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
    return ResponseHelper;
}());
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=responsehelper.js.map
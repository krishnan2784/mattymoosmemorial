"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var responsehelper_1 = require("../services/helpers/responsehelper");
var ApiResponse = (function () {
    function ApiResponse(options) {
        if (options === void 0) { options = {}; }
        this.success = options['success'];
        this.message = options['message'] || '';
        this.content = options['content'] || null;
        if (this.content !== null && typeof this.content === "object")
            this.content = responsehelper_1.ResponseHelper.toCamel(this.content);
    }
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=apiresponse.js.map
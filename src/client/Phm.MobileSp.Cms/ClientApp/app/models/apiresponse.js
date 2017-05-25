"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiResponse = (function () {
    function ApiResponse(options) {
        if (options === void 0) { options = {}; }
        this.success = options['success'];
        this.message = options['message'] || '';
        this.content = options['content'] || null;
    }
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=apiresponse.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserObservation = (function () {
    function UserObservation(options) {
        if (options === void 0) { options = {}; }
        this.feedId = options['feedId'] || 0;
        this.userId = options['userId'] || 0;
        this.user = options['user'] || '';
    }
    return UserObservation;
}());
exports.UserObservation = UserObservation;
//# sourceMappingURL=observationclasses.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LeaderBoardData = (function () {
    function LeaderBoardData(options) {
        if (options === void 0) { options = {}; }
        this.currentUser = options['currentUser'];
        this.dealershipCode = options['dealershipCode'];
        this.regionName = options['regionName'];
        this.roleName = options['roleName'];
        this.zoneName = options['zoneName'];
        this.totalMLearningPoints = options['totalMLearningPoints'] || 0;
    }
    return LeaderBoardData;
}());
exports.LeaderBoardData = LeaderBoardData;
//# sourceMappingURL=leaderboardclasses.js.map
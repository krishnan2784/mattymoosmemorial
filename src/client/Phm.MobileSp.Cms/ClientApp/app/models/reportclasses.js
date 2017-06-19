"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeedItemSummary = (function () {
    function FeedItemSummary(options) {
        if (options === void 0) { options = {}; }
        this.quizFeedId = options['quizFeedId'] || 0;
        this.averageScore = options['averageScore'] || 55.6;
        this.averageTime = options['averageTime'] || null;
        this.submitted = options['submitted'] || 100;
        this.passed = options['passed'] || 80;
        this.failed = options['failed'] || 20;
    }
    return FeedItemSummary;
}());
exports.FeedItemSummary = FeedItemSummary;
//# sourceMappingURL=reportclasses.js.map
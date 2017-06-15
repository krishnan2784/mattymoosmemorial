"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeedItemSummary = (function () {
    function FeedItemSummary(options) {
        if (options === void 0) { options = {}; }
        this.quizFeedId = options['qurveyQuestionId'] || 0;
        this.averageScore = options['averageScore'] || 0;
        this.averageTime = options['averageTime'] || null;
        this.submitted = options['submitted'] || 0;
        this.passed = options['passed'] || 0;
        this.failed = options['failed'] || 0;
    }
    return FeedItemSummary;
}());
exports.FeedItemSummary = FeedItemSummary;
//# sourceMappingURL=reportclasses.js.map
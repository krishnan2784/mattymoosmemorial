"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Baseclasses = require("./baseclasses");
var BaseModel = Baseclasses.BaseModel;
var FeedItemSummary = (function () {
    function FeedItemSummary(options) {
        if (options === void 0) { options = {}; }
        this.quizFeedId = options['quizFeedId'] || 0;
        this.averageScore = options['averageScore'] || 55.6;
        this.averageTime = options['averageTime'] || null;
        this.submitted = options['submitted'] || 100;
        this.passed = options['passed'] || 80;
        this.failed = options['failed'] || 20;
        this.submissions = options['submissions'];
    }
    return FeedItemSummary;
}());
exports.FeedItemSummary = FeedItemSummary;
var FeedItemSummaryEx = (function (_super) {
    __extends(FeedItemSummaryEx, _super);
    function FeedItemSummaryEx(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.finishedAt = options['finishedAt'];
        _this.mainUserGroup = options['mainUserGroup'] || '';
        _this.dealershipName = options['dealershipName'] || '';
        _this.minSucceedThreshold = options['minSucceedThreshold'] || 0;
        _this.pointsGained = options['pointsGained'] || 0;
        _this.quizFeedId = options['quizFeedId'] || 0;
        _this.quizFeedResults = options['quizFeedResults'];
        _this.resultPercentage = options['resultPercentage'] || 0;
        _this.startedAt = options['startedAt'];
        _this.totalQuestions = options['totalQuestions'] || 0;
        _this.totalRightQuestions = options['totalRightQuestions'] || 0;
        _this.user = options['user'];
        return _this;
    }
    return FeedItemSummaryEx;
}(BaseModel));
exports.FeedItemSummaryEx = FeedItemSummaryEx;
var QuizFeedResult = (function (_super) {
    __extends(QuizFeedResult, _super);
    function QuizFeedResult(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.isSelected = options['isSelected'] || false;
        _this.quizAnswerId = options['quizAnswerId'] || 0;
        _this.quizFeedId = options['quizFeedId'] || 0;
        _this.quizQuestionId = options['quizQuestionId'] || 0;
        _this.userId = options['userId'] || 0;
        return _this;
    }
    return QuizFeedResult;
}(BaseModel));
exports.QuizFeedResult = QuizFeedResult;
var SurveyItemSummary = (function (_super) {
    __extends(SurveyItemSummary, _super);
    function SurveyItemSummary(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.surveyFeedResults = options["surveyQuestionSummaries"];
        _this.surveyFeedId = options["surveyFeedId"] || 0;
        _this.submitted = options["submitted"] || 0;
        _this.totalRecipents = options["totalRecipents"] || 0;
        _this.totalRecipents = _this.totalRecipents > _this.submitted ? _this.totalRecipents : _this.submitted;
        return _this;
    }
    return SurveyItemSummary;
}(FeedItemSummary));
exports.SurveyItemSummary = SurveyItemSummary;
var SurveyFeedResult = (function (_super) {
    __extends(SurveyFeedResult, _super);
    function SurveyFeedResult(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.surveyAnswerSummaries = options['surveyAnswerSummaries'];
        _this.surveyQuestionId = options['surveyQuestionId'] || 0;
        _this.surveySummaryId = options['surveySummaryId'] || 0;
        return _this;
    }
    return SurveyFeedResult;
}(BaseModel));
exports.SurveyFeedResult = SurveyFeedResult;
var SurveyFeedAnswerResult = (function (_super) {
    __extends(SurveyFeedAnswerResult, _super);
    function SurveyFeedAnswerResult(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.surverQuestionAnwerId = options['surverQuestionAnwerId'] || 0;
        _this.surveyQuestionSummaryId = options['surveyQuestionSummaryId'] || 0;
        _this.totalSelected = options['totalSelected'] || 0;
        _this.percentage = options['percentage'] || 0;
        return _this;
    }
    return SurveyFeedAnswerResult;
}(BaseModel));
exports.SurveyFeedAnswerResult = SurveyFeedAnswerResult;
var ObservationItemSummary = (function (_super) {
    __extends(ObservationItemSummary, _super);
    function ObservationItemSummary(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.observationFeedId = options["surveyFeedId"] || 0;
        return _this;
    }
    return ObservationItemSummary;
}(SurveyItemSummary));
exports.ObservationItemSummary = ObservationItemSummary;
//# sourceMappingURL=reportclasses.js.map
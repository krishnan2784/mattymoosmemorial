"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Enums = require("../enums");
var Baseclasses = require("./baseclasses");
var BaseModel = Baseclasses.BaseModel;
var SurveyQuestion = (function (_super) {
    __extends(SurveyQuestion, _super);
    function SurveyQuestion(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.answers = options['Answers'];
        _this.order = options['Order'] || 0;
        _this.question = options['Question'] || '';
        _this.surveyQuestionTypeEnum = options['SurveyQuestionTypeEnum'] || Enums.SurveyQuestionTypeEnum.Single;
        _this.surveyFeedId = options['SurveyFeedId'] || 0;
        if (!_this.answers) {
            _this.answers = [];
            _this.answers.push(new SurveyQuestionAnswer());
            _this.answers.push(new SurveyQuestionAnswer());
        }
        return _this;
    }
    return SurveyQuestion;
}(Baseclasses.BaseModel));
exports.SurveyQuestion = SurveyQuestion;
var SurveyQuestionAnswer = (function (_super) {
    __extends(SurveyQuestionAnswer, _super);
    function SurveyQuestionAnswer(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.answer = options['Answer'] || '';
        _this.isFreeText = options['IsFreeText'] || false;
        _this.order = options['Order'] || 0;
        _this.surveyQuestionId = options['SurveyQuestionId'] || 0;
        return _this;
    }
    return SurveyQuestionAnswer;
}(BaseModel));
exports.SurveyQuestionAnswer = SurveyQuestionAnswer;
//# sourceMappingURL=surveyclasses.js.map
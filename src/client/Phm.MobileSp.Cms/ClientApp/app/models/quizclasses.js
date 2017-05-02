"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Baseclasses = require("./baseclasses");
var BaseModel = Baseclasses.BaseModel;
var QuizQuestion = (function (_super) {
    __extends(QuizQuestion, _super);
    function QuizQuestion(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.answers = options['Answers'] || '';
        _this.order = options['Order'];
        _this.question = options['Question'];
        _this.questionType = options['QuestionType'];
        _this.quizFeedId = options['QuizFeedId'];
        return _this;
    }
    return QuizQuestion;
}(Baseclasses.BaseModel));
exports.QuizQuestion = QuizQuestion;
var QuizQuestionAnswer = (function (_super) {
    __extends(QuizQuestionAnswer, _super);
    function QuizQuestionAnswer(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.answer = options['Answer'] || '';
        _this.isCorrect = options['IsCorrect'];
        _this.order = options['Order'];
        _this.quizQuestionId = options['QuizQuestionId'];
        return _this;
    }
    return QuizQuestionAnswer;
}(BaseModel));
exports.QuizQuestionAnswer = QuizQuestionAnswer;
//# sourceMappingURL=quizclasses.js.map
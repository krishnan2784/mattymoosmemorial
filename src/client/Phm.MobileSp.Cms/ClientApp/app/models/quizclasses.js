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
var Enums = require("../enums");
var Baseclasses = require("./baseclasses");
var BaseModel = Baseclasses.BaseModel;
var QuizQuestion = (function (_super) {
    __extends(QuizQuestion, _super);
    function QuizQuestion(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.answers = options['answers'];
        _this.order = options['order'] || 0;
        _this.question = options['question'] || '';
        _this.questionType = options['questionType'] || Enums.QuizQuestionTypeEnum.Single;
        _this.quizFeedId = options['quizFeedId'] || 0;
        if (!_this.answers) {
            _this.answers = [];
            _this.answers.push(new QuizQuestionAnswer());
            _this.answers.push(new QuizQuestionAnswer());
        }
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
        _this.answer = options['answer'] || '';
        _this.isCorrect = options['isCorrect'] || false;
        _this.order = options['order'] || 0;
        _this.quizQuestionId = options['quizQuestionId'] || 0;
        return _this;
    }
    return QuizQuestionAnswer;
}(BaseModel));
exports.QuizQuestionAnswer = QuizQuestionAnswer;
//# sourceMappingURL=quizclasses.js.map
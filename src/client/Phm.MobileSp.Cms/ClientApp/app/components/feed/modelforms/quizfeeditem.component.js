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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var Feedclasses = require("../../../models/feedclasses");
var QuizClasses = require("../../../models/quizclasses");
var Basequestionfeeditemcomponent = require("./basequestionfeeditem.component");
var BaseQuestionFeedItemFormComponent = Basequestionfeeditemcomponent.BaseQuestionFeedItemFormComponent;
var validators_1 = require("../../../classes/validators");
var QuizFeedItemFormComponent = (function (_super) {
    __extends(QuizFeedItemFormComponent, _super);
    function QuizFeedItemFormComponent(injector) {
        var _this = _super.call(this, injector, Feedclasses.QuizFeed, '/api/Feed/UpdateQuizFeedItem', FeedTypeEnum.Quiz, Enums.QuizQuestionTypeEnum) || this;
        _this.questionType = Enums.QuizQuestionTypeEnum;
        return _this;
    }
    QuizFeedItemFormComponent.prototype.addFormControls = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([], forms_1.Validators.minLength(1));
        this.model.questions.forEach(function (x) { return formArray.push(_this.initQuestion(x)); });
        this.form.addControl('questions', formArray);
        this.form.addControl('onBoardingMessage', new forms_1.FormControl(this.model.onBoardingMessage, []));
        this.form.addControl('successMessage', new forms_1.FormControl(this.model.successMessage, [forms_1.Validators.required]));
        this.form.addControl('failMessage', new forms_1.FormControl(this.model.failMessage, [forms_1.Validators.required]));
        this.form.controls['mainIconId'].setValidators(null);
    };
    ;
    QuizFeedItemFormComponent.prototype.removeFormControls = function () {
        this.form.removeControl('questions');
        this.form.removeControl('onBoardingMessage');
        this.form.removeControl('successMessage');
        this.form.removeControl('failMessage');
        this.form.controls['mainIconId'].setValidators(forms_1.Validators.required);
    };
    ;
    QuizFeedItemFormComponent.prototype.initQuestion = function (question) {
        if (question === void 0) { question = new QuizClasses.QuizQuestion(); }
        var fg = this.baseQuestionForm(question);
        fg.addControl('quizFeedId', new forms_1.FormControl(question.quizFeedId, []));
        fg.setValidators(validators_1.minCorrectAnswers(1));
        fg.controls['answers'].setValidators(forms_1.Validators.minLength(2));
        return fg;
    };
    QuizFeedItemFormComponent.prototype.initAnswer = function (answer) {
        if (answer === void 0) { answer = new QuizClasses.QuizQuestionAnswer(); }
        var fg = this.baseAnswerForm(answer);
        fg.addControl('quizQuestionId', new forms_1.FormControl(answer.quizQuestionId, []));
        fg.addControl('isCorrect', new forms_1.FormControl(answer.isCorrect, []));
        return fg;
    };
    return QuizFeedItemFormComponent;
}(BaseQuestionFeedItemFormComponent));
QuizFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'quizfeeditem',
        template: require('./basequestionfeeditem.component.html'),
        styles: [require('./basequestionfeeditem.component.css')]
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], QuizFeedItemFormComponent);
exports.QuizFeedItemFormComponent = QuizFeedItemFormComponent;
//# sourceMappingURL=quizfeeditem.component.js.map
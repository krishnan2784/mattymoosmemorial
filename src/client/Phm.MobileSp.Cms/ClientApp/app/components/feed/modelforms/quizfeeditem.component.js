"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var Feedclasses = require("../../../models/feedclasses");
var QuizClasses = require("../../../models/quizclasses");
var basepartialfeeditem_component_1 = require("./basepartialfeeditem.component");
var QuizFeedItemFormComponent = (function (_super) {
    __extends(QuizFeedItemFormComponent, _super);
    function QuizFeedItemFormComponent(injector) {
        var _this = _super.call(this, injector, Feedclasses.QuizFeed, '/api/Feed/UpdateQuizFeedItem', FeedTypeEnum.Quiz) || this;
        _this.answerType = Enums.QuizQuestionTypeEnum;
        _this.currentQuestion = 0;
        return _this;
    }
    QuizFeedItemFormComponent.prototype.addFormControls = function (form) {
        var _this = this;
        var formArray = new forms_1.FormArray([]);
        var qfiModel = new Feedclasses.QuizFeed(this.model);
        qfiModel.questions.forEach(function (x) { return formArray.push(_this.initQuestion(x)); });
        form.addControl('questions', formArray);
        form.addControl('onBoardingMessage', new forms_1.FormControl(qfiModel.onBoardingMessage, [forms_1.Validators.required, forms_1.Validators.minLength(5)]));
        form.addControl('successMessage', new forms_1.FormControl(qfiModel.successMessage, [forms_1.Validators.required, forms_1.Validators.minLength(5)]));
        form.addControl('failMessage', new forms_1.FormControl(qfiModel.failMessage, [forms_1.Validators.required, forms_1.Validators.minLength(5)]));
        return form;
    };
    ;
    QuizFeedItemFormComponent.prototype.removeFormControls = function (form) {
        form.removeControl('questions');
        return form;
    };
    ;
    QuizFeedItemFormComponent.prototype.initQuestion = function (question) {
        var _this = this;
        if (question === void 0) { question = new QuizClasses.QuizQuestion(); }
        var formArray = new forms_1.FormArray([]);
        question.answers.forEach(function (x) { return formArray.push(_this.initAnswer(x)); });
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(question.id, []),
            quizFeedId: new forms_1.FormControl(question.quizFeedId, []),
            masterId: new forms_1.FormControl(question.masterId, []),
            order: new forms_1.FormControl(question.order, []),
            enabled: new forms_1.FormControl(question.enabled, []),
            published: new forms_1.FormControl(question.published, []),
            question: new forms_1.FormControl(question.question, [forms_1.Validators.required]),
            questionType: new forms_1.FormControl(question.questionType, [forms_1.Validators.required]),
            answers: formArray
        });
    };
    QuizFeedItemFormComponent.prototype.initAnswer = function (answer) {
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(answer.id, []),
            quizQuestionId: new forms_1.FormControl(answer.quizQuestionId, []),
            masterId: new forms_1.FormControl(answer.masterId, []),
            order: new forms_1.FormControl(answer.order, []),
            enabled: new forms_1.FormControl(answer.enabled, []),
            published: new forms_1.FormControl(answer.published, []),
            answer: new forms_1.FormControl(answer.answer, [forms_1.Validators.required]),
            isCorrect: new forms_1.FormControl(answer.isCorrect, [])
        });
    };
    QuizFeedItemFormComponent.prototype.addQuestion = function (question) {
        if (question === void 0) { question = new QuizClasses.QuizQuestion(); }
        var control = this.form.controls['questions'];
        control.push(this.initQuestion(question));
        this.displayQuestion(control.length - 1);
    };
    QuizFeedItemFormComponent.prototype.removeQuestion = function (index) {
        var questions = this.form.controls['questions'];
        if (this.currentQuestion > 0)
            this.displayQuestion(this.currentQuestion - 1);
        questions.removeAt(index);
    };
    QuizFeedItemFormComponent.prototype.displayQuestion = function (index) {
        var questions = this.form.controls['questions'];
        if (index < 0 || index > (questions.length - 1))
            return;
        this.currentQuestion = index;
        setTimeout(function () {
            Materialize.updateTextFields();
        }, 10);
    };
    return QuizFeedItemFormComponent;
}(basepartialfeeditem_component_1.BasePartialItemFormComponent));
QuizFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'quizfeeditem',
        template: require('./quizfeeditem.component.html'),
        styles: [require('./quizfeeditem.component.css')],
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], QuizFeedItemFormComponent);
exports.QuizFeedItemFormComponent = QuizFeedItemFormComponent;
//# sourceMappingURL=quizfeeditem.component.js.map
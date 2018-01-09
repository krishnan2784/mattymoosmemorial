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
var basepartialfeeditem_component_1 = require("./basepartialfeeditem.component");
var BaseQuestionFeedItemFormComponent = (function (_super) {
    __extends(BaseQuestionFeedItemFormComponent, _super);
    function BaseQuestionFeedItemFormComponent(injector, feedModelType, feedType, questionTypeEnum) {
        var _this = _super.call(this, injector, feedModelType, feedType) || this;
        _this.questionTypeEnum = questionTypeEnum;
        _this.currentQuestion = 0;
        return _this;
    }
    BaseQuestionFeedItemFormComponent.prototype.currQuestion = function () {
        var questions = this.form.controls['questions'];
        return questions.controls[this.currentQuestion];
    };
    BaseQuestionFeedItemFormComponent.prototype.baseQuestionForm = function (question) {
        var _this = this;
        var formArray = new forms_1.FormArray([], forms_1.Validators.minLength(1));
        question.answers.forEach(function (x) { return formArray.push(_this.initAnswer(x)); });
        var fg = new forms_1.FormGroup({
            id: new forms_1.FormControl(question.id, []),
            masterId: new forms_1.FormControl(question.masterId, []),
            order: new forms_1.FormControl(question.order, []),
            enabled: new forms_1.FormControl(question.enabled, []),
            published: new forms_1.FormControl(question.published, []),
            question: new forms_1.FormControl(question.question ? question.question : '', [forms_1.Validators.required]),
            questionType: new forms_1.FormControl(question.questionType, [forms_1.Validators.required]),
            answers: formArray
        });
        return fg;
    };
    ;
    BaseQuestionFeedItemFormComponent.prototype.baseAnswerForm = function (answer) {
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(answer.id, []),
            masterId: new forms_1.FormControl(answer.masterId, []),
            order: new forms_1.FormControl(answer.order, []),
            enabled: new forms_1.FormControl(answer.enabled, []),
            published: new forms_1.FormControl(answer.published, []),
            answer: new forms_1.FormControl(answer.answer, [forms_1.Validators.required])
        });
    };
    ;
    BaseQuestionFeedItemFormComponent.prototype.initQuestion = function (question) {
        if (question === void 0) { question = null; }
        return null;
    };
    BaseQuestionFeedItemFormComponent.prototype.initAnswer = function (answer) {
        if (answer === void 0) { answer = null; }
        return null;
    };
    BaseQuestionFeedItemFormComponent.prototype.addQuestion = function () {
        var control = this.form.controls['questions'];
        control.push(this.initQuestion());
        this.displayQuestion(control.length - 1);
    };
    BaseQuestionFeedItemFormComponent.prototype.removeQuestion = function (index) {
        var questions = this.form.controls['questions'];
        if (this.currentQuestion > 0)
            this.displayQuestion(this.currentQuestion - 1);
        questions.removeAt(index);
        this.form.markAsDirty();
    };
    BaseQuestionFeedItemFormComponent.prototype.addAnswer = function () {
        var control = this.currQuestion().controls['answers'];
        control.push(this.initAnswer());
    };
    BaseQuestionFeedItemFormComponent.prototype.removeAnswer = function (index) {
        var control = this.currQuestion().controls['answers'];
        control.removeAt(index);
        this.form.markAsDirty();
    };
    BaseQuestionFeedItemFormComponent.prototype.displayQuestion = function (index) {
        var questions = this.form.controls['questions'];
        if (index < 0 || index > (questions.length - 1))
            return;
        this.currentQuestion = index;
    };
    return BaseQuestionFeedItemFormComponent;
}(basepartialfeeditem_component_1.BasePartialItemFormComponent));
BaseQuestionFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'questionfeeditem',
        template: require('./basequestionfeeditem.component.html'),
        styles: [require('./feeditemform.component.css'), require('./basequestionfeeditem.component.css')]
    }),
    __metadata("design:paramtypes", [core_1.Injector, Object, Number, Object])
], BaseQuestionFeedItemFormComponent);
exports.BaseQuestionFeedItemFormComponent = BaseQuestionFeedItemFormComponent;
//# sourceMappingURL=basequestionfeeditem.component.js.map
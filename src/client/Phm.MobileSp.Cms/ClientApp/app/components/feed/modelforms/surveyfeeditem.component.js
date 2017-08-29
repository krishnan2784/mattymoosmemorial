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
var SurveyClasses = require("../../../models/surveyclasses");
var Basequestionfeeditemcomponent = require("./basequestionfeeditem.component");
var BaseQuestionFeedItemFormComponent = Basequestionfeeditemcomponent.BaseQuestionFeedItemFormComponent;
var SurveyFeedItemFormComponent = (function (_super) {
    __extends(SurveyFeedItemFormComponent, _super);
    function SurveyFeedItemFormComponent(injector) {
        return _super.call(this, injector, Feedclasses.SurveyFeed, '/api/Feed/UpdateSurveyFeedItem', FeedTypeEnum.Survey, Enums.SurveyQuestionTypeEnum) || this;
    }
    //constructor(injector: Injector, feedModelType: any = Feedclasses.SurveyFeed, updateUrl: string = '/api/Feed/UpdateSurveyFeedItem',
    //    feedType: Enums.FeedTypeEnum = FeedTypeEnum.Survey, questionTypeEnum: any = Enums.SurveyQuestionTypeEnum) {
    //    super(injector, feedModelType, updateUrl, feedType, questionTypeEnum);
    //}
    SurveyFeedItemFormComponent.prototype.addFormControls = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([], forms_1.Validators.minLength(1));
        this.model.questions.forEach(function (x) { return formArray.push(_this.initQuestion(x)); });
        this.form.addControl('questions', formArray);
        this.form.addControl('surveyDescription', new forms_1.FormControl(this.model.surveyDescription, []));
        this.form.addControl('completionMessage', new forms_1.FormControl(this.model.completionMessage, []));
        this.form.controls['mainIconId'].setValidators(null);
    };
    ;
    SurveyFeedItemFormComponent.prototype.removeFormControls = function () {
        this.form.removeControl('questions');
        this.form.removeControl('surveyDescription');
        this.form.removeControl('completionMessage');
        this.form.controls['mainIconId'].setValidators(forms_1.Validators.required);
    };
    ;
    SurveyFeedItemFormComponent.prototype.initQuestion = function (question) {
        if (question === void 0) { question = new SurveyClasses.SurveyQuestion(); }
        question = new SurveyClasses.SurveyQuestion(question);
        var fg = this.baseQuestionForm(question);
        fg.addControl('surveyFeedId', new forms_1.FormControl(question.surveyFeedId, []));
        return fg;
    };
    SurveyFeedItemFormComponent.prototype.initAnswer = function (answer) {
        if (answer === void 0) { answer = new SurveyClasses.SurveyQuestionAnswer(); }
        answer = new SurveyClasses.SurveyQuestionAnswer(answer);
        var fg = this.baseAnswerForm(answer);
        fg.addControl('surveyQuestionId', new forms_1.FormControl(answer.surveyQuestionId, []));
        fg.addControl('isFreeText', new forms_1.FormControl(answer.isFreeText, []));
        return fg;
    };
    return SurveyFeedItemFormComponent;
}(BaseQuestionFeedItemFormComponent));
SurveyFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'surveyfeeditem',
        template: require('./basequestionfeeditem.component.html'),
        styles: [require('./basequestionfeeditem.component.css')]
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], SurveyFeedItemFormComponent);
exports.SurveyFeedItemFormComponent = SurveyFeedItemFormComponent;
//# sourceMappingURL=surveyfeeditem.component.js.map
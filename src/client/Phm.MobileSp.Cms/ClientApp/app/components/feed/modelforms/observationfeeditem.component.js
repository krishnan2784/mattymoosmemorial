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
var Observationclasses = require("../../../models/observationclasses");
var UserObservation = Observationclasses.UserObservation;
var validators_1 = require("../../../classes/validators");
var ObservationFeedItemFormComponent = (function (_super) {
    __extends(ObservationFeedItemFormComponent, _super);
    function ObservationFeedItemFormComponent(injector) {
        var _this = _super.call(this, injector, Feedclasses.ObservationFeed, '/api/Feed/UpdateObservationFeedItem', FeedTypeEnum.Observation, Enums.SurveyQuestionTypeEnum) || this;
        if (_this.model) {
            _this.model.points = null;
            _this.form.controls['points'].patchValue(_this.model.points, { onlySelf: true });
        }
        return _this;
    }
    ObservationFeedItemFormComponent.prototype.addFormControls = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([], forms_1.Validators.required);
        this.model.questions.forEach(function (x) { return formArray.push(_this.initQuestion(x)); });
        this.form.addControl('questions', formArray);
        var userFormArray = new forms_1.FormArray([]);
        this.model.userObservations.forEach(function (x) { return userFormArray.push(_this.initUserObservation(x)); });
        this.form.addControl('userObservations', userFormArray);
        this.form.addControl('surveyDescription', new forms_1.FormControl(this.model.surveyDescription, [forms_1.Validators.required, forms_1.Validators.minLength(5)]));
        this.form.addControl('completionMessage', new forms_1.FormControl(this.model.completionMessage, [forms_1.Validators.required, forms_1.Validators.minLength(5)]));
        this.form.controls['mainIconId'].setValidators(null);
        this.form.controls['readingTime'].setValidators(null);
        this.form.controls['points'].setValidators(null);
    };
    ;
    ObservationFeedItemFormComponent.prototype.removeFormControls = function () {
        this.form.removeControl('questions');
        this.form.removeControl('userObservations');
        this.form.removeControl('surveyDescription');
        this.form.removeControl('completionMessage');
        this.form.controls['mainIconId'].setValidators(forms_1.Validators.required);
        this.form.controls['readingTime'].setValidators([forms_1.Validators.required, validators_1.minValue(1)]);
        this.form.controls['points'].setValidators([forms_1.Validators.required, validators_1.minValue(1)]);
    };
    ;
    ObservationFeedItemFormComponent.prototype.initUserObservation = function (userObservation) {
        if (userObservation === void 0) { userObservation = new UserObservation(); }
        var fg = new forms_1.FormGroup({
            feedId: new forms_1.FormControl(userObservation.feedId, []),
            userId: new forms_1.FormControl(userObservation.userId, []),
            user: new forms_1.FormGroup({
                id: new forms_1.FormControl(userObservation.user.id, []),
                userName: new forms_1.FormControl(userObservation.user.userName, [])
            })
        });
        return fg;
    };
    ObservationFeedItemFormComponent.prototype.initQuestion = function (question) {
        if (question === void 0) { question = new SurveyClasses.SurveyQuestion(); }
        var fg = this.baseQuestionForm(question);
        fg.addControl('surveyFeedId', new forms_1.FormControl(question.surveyFeedId, []));
        return fg;
    };
    ObservationFeedItemFormComponent.prototype.initAnswer = function (answer) {
        if (answer === void 0) { answer = new SurveyClasses.SurveyQuestionAnswer(); }
        var fg = this.baseAnswerForm(answer);
        fg.addControl('surveyQuestionId', new forms_1.FormControl(answer.surveyQuestionId, []));
        fg.addControl('isFreeText', new forms_1.FormControl(answer.isFreeText, []));
        return fg;
    };
    return ObservationFeedItemFormComponent;
}(BaseQuestionFeedItemFormComponent));
ObservationFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'observationfeeditem',
        template: require('./basequestionfeeditem.component.html'),
        styles: [require('./basequestionfeeditem.component.css')]
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], ObservationFeedItemFormComponent);
exports.ObservationFeedItemFormComponent = ObservationFeedItemFormComponent;
//# sourceMappingURL=observationfeeditem.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var Enums = require("../enums");
var FeedFormSteps = (function () {
    function FeedFormSteps() {
        this.currentStep = null;
        this.formType = Enums.FeedTypeEnum.Text;
        this.visibleSteps = [];
        this.feedStepTypes = FeedFormStepType;
        this.setupSteps();
    }
    FeedFormSteps.prototype.ngOnInit = function () {
    };
    FeedFormSteps.prototype.setupSteps = function () {
        var _this = this;
        this.steps = Observable_1.Observable.create(function (observer) {
            var steps = [];
            steps.push(new FeedFormStep(FeedFormStepType.Category, 0, "Category"));
            steps.push(new FeedFormStep(FeedFormStepType.Main, 1, "Main"));
            if (_this.formType === Enums.FeedTypeEnum.Quiz) {
                steps.push(new FeedFormStep(FeedFormStepType.QuizQuestions, 2, "Quiz Questions"));
                steps.push(new FeedFormStep(FeedFormStepType.QuizScore, 3, "Quiz Results"));
            }
            else if (_this.formType === Enums.FeedTypeEnum.Survey || _this.formType === Enums.FeedTypeEnum.Observation) {
                steps.push(new FeedFormStep(FeedFormStepType.SurveyQuestions, 2, "Survey Questions"));
                steps.push(new FeedFormStep(FeedFormStepType.SurveyScore, 3, "Survey Results"));
            }
            else {
                steps.push(new FeedFormStep(FeedFormStepType.Media, 2, "Media (if required)"));
                steps.push(new FeedFormStep(FeedFormStepType.Links, 3, "Links (if required)"));
            }
            observer.next(steps);
        });
        this.steps.subscribe(function (result) {
            if (result.length) {
                _this.visibleSteps = result;
                _this.currentStep = result[0];
            }
        });
    };
    FeedFormSteps.prototype.setFormType = function (newFormType) {
        this.formType = newFormType;
        this.setupSteps();
    };
    FeedFormSteps.prototype.isPreviousButtonVisible = function () {
        var _this = this;
        return this.visibleSteps.filter(function (x) { return x.stepPosition > _this.currentStep.stepPosition; }).length > 0;
    };
    FeedFormSteps.prototype.isNextButtonVisible = function () {
        var _this = this;
        return this.visibleSteps.filter(function (x) { return x.stepPosition < _this.currentStep.stepPosition; }).length > 0;
    };
    FeedFormSteps.prototype.isCurrentStep = function (stepType) {
        return this.currentStep.type === stepType;
    };
    FeedFormSteps.prototype.navigateToPreviousStep = function () {
        var _this = this;
        var prevSteps = this.visibleSteps.filter(function (x) { return x.stepPosition < _this.currentStep.stepPosition; });
        this.currentStep = prevSteps[prevSteps.length - 1];
    };
    FeedFormSteps.prototype.navigateToNextStep = function () {
        var _this = this;
        this.currentStep = this.visibleSteps.filter(function (x) { return x.stepPosition > _this.currentStep.stepPosition; })[0];
    };
    FeedFormSteps.prototype.navigateToSelectedStep = function (selectedStep) {
        this.currentStep = this.visibleSteps.find(function (x) { return x.type === selectedStep.type; });
        setTimeout(function () {
            Materialize.updateTextFields();
            $('.datepicker').pickadate({
                selectMonths: true,
                selectYears: 5,
                format: 'dddd, dd mmm, yyyy',
                formatSubmit: 'yyyy/mm/dd'
            });
        }, 1);
    };
    return FeedFormSteps;
}());
exports.FeedFormSteps = FeedFormSteps;
var FeedFormStep = (function () {
    function FeedFormStep(type, stepPosition, name) {
        this.type = type;
        this.stepPosition = stepPosition;
        this.name = name;
    }
    return FeedFormStep;
}());
exports.FeedFormStep = FeedFormStep;
var FeedFormStepType;
(function (FeedFormStepType) {
    FeedFormStepType[FeedFormStepType["Category"] = 0] = "Category";
    FeedFormStepType[FeedFormStepType["Main"] = 1] = "Main";
    FeedFormStepType[FeedFormStepType["Media"] = 2] = "Media";
    FeedFormStepType[FeedFormStepType["Links"] = 3] = "Links";
    FeedFormStepType[FeedFormStepType["QuizQuestions"] = 4] = "QuizQuestions";
    FeedFormStepType[FeedFormStepType["QuizScore"] = 5] = "QuizScore";
    FeedFormStepType[FeedFormStepType["SurveyQuestions"] = 6] = "SurveyQuestions";
    FeedFormStepType[FeedFormStepType["SurveyScore"] = 7] = "SurveyScore";
})(FeedFormStepType = exports.FeedFormStepType || (exports.FeedFormStepType = {}));
//# sourceMappingURL=feedformstepsclasses.js.map
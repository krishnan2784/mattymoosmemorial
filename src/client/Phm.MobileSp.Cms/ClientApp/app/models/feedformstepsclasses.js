"use strict";
var FeedFormSteps = (function () {
    function FeedFormSteps() {
        this.steps = [];
        this.steps.push(new FeedFormStep(FeedFormStepType.Category, 0, "Category", true));
        this.steps.push(new FeedFormStep(FeedFormStepType.Main, 1, "Main", true));
        this.steps.push(new FeedFormStep(FeedFormStepType.Media, 2, "Media (if required)", true));
        this.steps.push(new FeedFormStep(FeedFormStepType.QuizQuestions, 2, "Quiz Questions", false));
        this.steps.push(new FeedFormStep(FeedFormStepType.SurveyQuestions, 2, "Survey Questions", false));
        this.steps.push(new FeedFormStep(FeedFormStepType.Links, 3, "Links (if required)", true));
        this.steps.push(new FeedFormStep(FeedFormStepType.QuizAnswers, 2, "Quiz Answers", false));
        this.steps.push(new FeedFormStep(FeedFormStepType.SurveyAnswers, 2, "Survey Answers", false));
        this.currentStep = this.steps[0];
    }
    FeedFormSteps.prototype.isPreviousButtonVisible = function () {
        var _this = this;
        return this.steps.filter(function (x) { return x.stepPosition > _this.currentStep.stepPosition && x.isVisible; }).length > 0;
    };
    FeedFormSteps.prototype.isNextButtonVisible = function () {
        var _this = this;
        return this.steps.filter(function (x) { return x.stepPosition < _this.currentStep.stepPosition && x.isVisible; }).length > 0;
    };
    FeedFormSteps.prototype.navigateToPreviousStep = function () {
        var _this = this;
        var prevSteps = this.steps.filter(function (x) { return x.stepPosition < _this.currentStep.stepPosition && x.isVisible; });
        this.currentStep = prevSteps[prevSteps.length - 1];
    };
    FeedFormSteps.prototype.navigateToNextStep = function () {
        var _this = this;
        this.currentStep = this.steps.filter(function (x) { return x.stepPosition > _this.currentStep.stepPosition && x.isVisible; })[0];
    };
    FeedFormSteps.prototype.naviagetToSelectedStep = function (selectedStep) {
        this.currentStep = this.steps.find(function (x) { return x.type === selectedStep.type; });
    };
    return FeedFormSteps;
}());
exports.FeedFormSteps = FeedFormSteps;
var FeedFormStep = (function () {
    function FeedFormStep(type, stepPosition, name, isVisible) {
        this.type = type;
        this.stepPosition = stepPosition;
        this.name = name;
        this.isVisible = isVisible;
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
    FeedFormStepType[FeedFormStepType["QuizAnswers"] = 5] = "QuizAnswers";
    FeedFormStepType[FeedFormStepType["SurveyQuestions"] = 6] = "SurveyQuestions";
    FeedFormStepType[FeedFormStepType["SurveyAnswers"] = 7] = "SurveyAnswers";
})(FeedFormStepType = exports.FeedFormStepType || (exports.FeedFormStepType = {}));
//# sourceMappingURL=feedformstepsclasses.js.map
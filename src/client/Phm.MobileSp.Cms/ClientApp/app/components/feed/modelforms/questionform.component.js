"use strict";
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
var QuestionFormComponent = (function () {
    function QuestionFormComponent() {
        this.feedTypeEnum = FeedTypeEnum;
        this.addAnswer = new core_1.EventEmitter();
        this.removeAnswer = new core_1.EventEmitter();
    }
    QuestionFormComponent.prototype.clearFormCheckboxes = function (index, checkbox) {
        if (index === void 0) { index = null; }
        if (checkbox === void 0) { checkbox = null; }
        var dynamicIndex;
        var answers = this.form.controls['answers'];
        var checked = checkbox ? checkbox.srcElement.checked : false;
        var controlName = "isFreeText";
        if (this.feedType === FeedTypeEnum.Quiz)
            controlName = "isCorrect";
        if (index != null) {
            var questionType = this.form.controls['questionType'].value;
            if (questionType === this.questionType.Multiple && this.feedType === FeedTypeEnum.Quiz)
                return;
            dynamicIndex = answers.controls[index];
        }
        answers.controls.forEach(function (control) {
            var dynamic = control;
            if (dynamic.controls[controlName]) {
                dynamic.controls[controlName].patchValue(false, { onlySelf: true });
            }
        });
        if (index != null) {
            dynamicIndex.controls[controlName].patchValue(checked, { onlySelf: true });
        }
    };
    return QuestionFormComponent;
}());
__decorate([
    core_1.Input('feedType'),
    __metadata("design:type", Number)
], QuestionFormComponent.prototype, "feedType", void 0);
__decorate([
    core_1.Input('form'),
    __metadata("design:type", forms_1.FormGroup)
], QuestionFormComponent.prototype, "form", void 0);
__decorate([
    core_1.Input('model'),
    __metadata("design:type", Object)
], QuestionFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input('index'),
    __metadata("design:type", Number)
], QuestionFormComponent.prototype, "index", void 0);
__decorate([
    core_1.Input('questionType'),
    __metadata("design:type", Object)
], QuestionFormComponent.prototype, "questionType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], QuestionFormComponent.prototype, "submitted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], QuestionFormComponent.prototype, "addAnswer", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], QuestionFormComponent.prototype, "removeAnswer", void 0);
QuestionFormComponent = __decorate([
    core_1.Component({
        selector: 'question',
        template: require('./questionform.component.html'),
        styles: [require('./questionform.component.css')]
    })
], QuestionFormComponent);
exports.QuestionFormComponent = QuestionFormComponent;
//# sourceMappingURL=questionform.component.js.map
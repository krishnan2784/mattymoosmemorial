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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var QuestionFormComponent = (function () {
    function QuestionFormComponent() {
    }
    QuestionFormComponent.prototype.addAnswer = function () {
        var control = this.form.controls['answers'];
        control.push(new forms_1.FormGroup({
            id: new forms_1.FormControl('', []),
            answer: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5)]),
            isCorrect: new forms_1.FormControl('', []),
            order: new forms_1.FormControl('', [])
        }));
    };
    QuestionFormComponent.prototype.removeAnswer = function (index) {
        var control = this.form.controls['answers'];
        control.removeAt(index);
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
QuestionFormComponent = __decorate([
    core_1.Component({
        selector: 'question',
        template: require('./questionform.component.html'),
        styles: [require('./questionform.component.css')]
    }),
    __metadata("design:paramtypes", [])
], QuestionFormComponent);
exports.QuestionFormComponent = QuestionFormComponent;
//# sourceMappingURL=questionform.component.js.map
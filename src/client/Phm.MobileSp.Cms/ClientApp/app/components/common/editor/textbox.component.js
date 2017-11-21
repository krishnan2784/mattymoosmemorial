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
var TextInputComponent = (function () {
    function TextInputComponent() {
        this.elementId = '';
        this.label = '';
        this.validationMessage = '';
        this.formSubmitted = false;
        this.maxLength = 0;
        this.placeHolder = '';
        this.activeClass = '';
    }
    TextInputComponent.prototype.ngOnInit = function () {
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId] && this.form.controls[this.formControlId].value) {
            this.activeClass = this.placeHolder !== '' || this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
        }
    };
    TextInputComponent.prototype.ngAfterViewInit = function () {
        $('#' + this.elementId).characterCounter();
    };
    return TextInputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], TextInputComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextInputComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextInputComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextInputComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextInputComponent.prototype, "validationMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TextInputComponent.prototype, "formSubmitted", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TextInputComponent.prototype, "maxLength", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextInputComponent.prototype, "placeHolder", void 0);
TextInputComponent = __decorate([
    core_1.Component({
        selector: 'textinput',
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n        <div class=\"input-field\">\n            <input id=\"{{elementId}}\" type=\"text\" formControlName=\"{{formControlId}}\" [attr.maxLength]=\"maxLength > 0 ? maxLength : null\" [attr.data-length]=\"maxLength > 0 ? maxLength : null\" [attr.placeholder]=\"placeHolder\">\n            <label *ngIf=\"label\" [attr.for]=\"elementId\" class=\"{{activeClass}}\">{{label}}</label>\n            <small *ngIf=\"validationMessage\" class=\"active-warning\" [class.hidden]=\"form.controls[formControlId].valid || !formSubmitted\">\n                {{validationMessage}}\n            </small>\n        </div>\n    </div>\n"
    })
], TextInputComponent);
exports.TextInputComponent = TextInputComponent;
//# sourceMappingURL=textbox.component.js.map
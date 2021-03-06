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
var NumberTextInputComponent = (function () {
    function NumberTextInputComponent() {
        this.elementId = '';
        this.label = '';
        this.validationMessage = '';
        this.formSubmitted = false;
        this.allowFractions = false;
        this.decimalPlaces = 2;
        this.placeholder = '';
        this.hasPoint = false;
        this.activeClass = '';
    }
    NumberTextInputComponent.prototype.ngOnInit = function () {
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId]) {
            this.activeClass = this.placeholder !== '' || (this.form.controls[this.formControlId].value
                && this.form.controls[this.formControlId].value.toString().length > 0) ? "active" : "";
        }
        this.checkPoint();
    };
    NumberTextInputComponent.prototype.handleInput = function (e) {
        if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')
            return;
        this.filterInput(e);
    };
    NumberTextInputComponent.prototype.filterInput = function (e) {
        // setting the type to number doesn't prevent the current versions of firefox and edge accepting 
        // non-numerical characters and only fails validation. To maintain consistency with Chrome we are 
        // (and also to prevent the 'e' character being entered) we're also manually checking input
        var char = e.key, currValue = this.form && this.form.controls[this.formControlId]
            && this.form.controls[this.formControlId].value ? this.form.controls[this.formControlId].value.toString() : '';
        var success;
        if (e.key === '.') {
            if (!this.allowFractions || this.hasPoint || currValue.length === 0) {
                e.preventDefault();
                return;
            }
            this.hasPoint = true;
            success = true;
        }
        else {
            success = char.match(/[0-9]/);
            if (success && this.allowFractions && this.hasPoint)
                success = currValue.length < (currValue.indexOf('.') + 1) + this.decimalPlaces;
        }
        if (!success) {
            e.preventDefault();
        }
    };
    NumberTextInputComponent.prototype.checkPoint = function () {
        if (this.allowFractions) {
            var currValue = this.form && this.form.controls[this.formControlId] && this.form.controls[this.formControlId].value
                ? this.form.controls[this.formControlId].value.toString()
                : '';
            this.hasPoint = currValue.includes('.');
        }
        return this.hasPoint;
    };
    return NumberTextInputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], NumberTextInputComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NumberTextInputComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NumberTextInputComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NumberTextInputComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NumberTextInputComponent.prototype, "validationMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NumberTextInputComponent.prototype, "formSubmitted", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NumberTextInputComponent.prototype, "allowFractions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NumberTextInputComponent.prototype, "decimalPlaces", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NumberTextInputComponent.prototype, "placeholder", void 0);
NumberTextInputComponent = __decorate([
    core_1.Component({
        selector: 'numbertextinput',
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n        <div class=\"input-field\">\n            <input id=\"{{elementId}}\" type=\"{{allowFractions ? 'text' : 'number'}}\"\n\t\t\t\tformControlName=\"{{formControlId}}\" (keydown)=\"handleInput($event)\" (keyup)=\"checkPoint()\" \n\t\t\t\t[attr.placeholder]=\"placeholder\">\n            <label [attr.for]=\"elementId\" class=\"{{activeClass}}\">{{label}}</label>\n            <small class=\"active-warning\" [class.hidden]=\"form.controls[formControlId].valid || !formSubmitted\">\n                {{validationMessage}}\n            </small>\n        </div>\n    </div>\n"
    })
], NumberTextInputComponent);
exports.NumberTextInputComponent = NumberTextInputComponent;
//# sourceMappingURL=numbertextbox.component.js.map
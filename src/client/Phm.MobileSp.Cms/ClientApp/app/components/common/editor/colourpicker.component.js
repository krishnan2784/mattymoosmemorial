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
var ColourPickerInputComponent = (function () {
    function ColourPickerInputComponent() {
        this.elementId = '';
        this.label = '';
        this.validationMessage = '';
        this.formSubmitted = false;
    }
    ColourPickerInputComponent.prototype.ngOnInit = function () {
        if (this.elementId == '')
            this.elementId = this.formControlId;
    };
    ColourPickerInputComponent.prototype.ngAfterViewInit = function () {
    };
    return ColourPickerInputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], ColourPickerInputComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColourPickerInputComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColourPickerInputComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColourPickerInputComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColourPickerInputComponent.prototype, "validationMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ColourPickerInputComponent.prototype, "formSubmitted", void 0);
ColourPickerInputComponent = __decorate([
    core_1.Component({
        selector: 'colourpicker',
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n        <div class=\"input-field\">\n            <input id=\"{{elementId}}\" type=\"text\" formControlName=\"{{formControlId}}\" [colorPicker]=\"form.controls[formControlId].value\">\n            <label [attr.for]=\"elementId\">{{label}}</label>\n            <small class=\"active-warning\" [class.hidden]=\"form.controls[formControlId].valid || !formSubmitted\">\n                {{validationMessage}}\n            </small>\n        </div>\n    </div>\n"
    })
], ColourPickerInputComponent);
exports.ColourPickerInputComponent = ColourPickerInputComponent;
//# sourceMappingURL=colourpicker.component.js.map
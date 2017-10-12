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
        if (this.form.controls[this.formControlId].value && this.form.controls[this.formControlId].value.indexOf('#') == -1)
            this.form.controls[this.formControlId].patchValue('#' + this.form.controls[this.formControlId].value, {});
    };
    ColourPickerInputComponent.prototype.ngAfterViewInit = function () {
    };
    ColourPickerInputComponent.prototype.setColour = function (colour) {
        this.form.controls[this.formControlId].patchValue(colour, {});
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
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n        <div class=\"col-md-8\">\n\t        <input type=\"hidden\" formControlName=\"{{formControlId}}\">\n\t        <h5 [attr.for]=\"elementId\">{{label}}</h5>\n\t\t\t<div id=\"{{elementId}}\" class=\"colour-block\" [style.background]=\"form.controls[formControlId].value\">\n\t\t\t\t<span [(colorPicker)]=\"form.controls[formControlId].value\" \t\t\t\t  \n\t\t\t\t\t\t[cpCancelButton]=\"true\"\n\t\t\t\t\t\t[cpOutputFormat]=\"hex\"\n\t\t\t\t\t\t[cpOKButton]=\"true\"\n\t\t\t\t\t\t[cpAlphaChannel]=\"disabled\"\n\t\t\t\t\t\t(colorPickerSelect)=\"setColour($event)\">{{form.controls[formControlId].value}}</span>\n\t\t\t</div>            \n            <small class=\"active-warning\" [class.hidden]=\"form.controls[formControlId].valid || !formSubmitted\">\n                {{validationMessage}}\n            </small>\n        </div>\n<div class=\"clearfix\"></div>\n    </div>\n",
        styles: [require('./colourpicker.component.css')]
    })
], ColourPickerInputComponent);
exports.ColourPickerInputComponent = ColourPickerInputComponent;
//# sourceMappingURL=colourpicker.component.js.map
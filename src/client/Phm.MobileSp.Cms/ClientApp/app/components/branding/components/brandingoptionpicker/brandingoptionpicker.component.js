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
var BrandingOptionPickerComponent = (function () {
    function BrandingOptionPickerComponent() {
        this.elementId = '';
        this.label = '';
        this.disabled = false;
        this.formSubmitted = false;
        this.options = [];
    }
    BrandingOptionPickerComponent.prototype.ngOnInit = function () {
        if (this.elementId == '')
            this.elementId = this.formControlId;
    };
    BrandingOptionPickerComponent.prototype.ngAfterViewInit = function () {
    };
    BrandingOptionPickerComponent.prototype.setOption = function (option) {
        this.form.controls[this.formControlId].patchValue(option, {});
    };
    return BrandingOptionPickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], BrandingOptionPickerComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BrandingOptionPickerComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BrandingOptionPickerComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BrandingOptionPickerComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BrandingOptionPickerComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BrandingOptionPickerComponent.prototype, "formSubmitted", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BrandingOptionPickerComponent.prototype, "options", void 0);
BrandingOptionPickerComponent = __decorate([
    core_1.Component({
        selector: 'brandingoptionpicker',
        template: "\n<div [formGroup]=\"form\" *ngIf=\"form\">\n\t<input type=\"hidden\" formControlName=\"{{formControlId}}\">\n\t    <h5 [attr.for]=\"elementId\">{{label}}</h5>\n\t\t<div class=\"option-container\">\n\t\t\t<span *ngFor=\"let o of options\" class=\"option-selector\">\n\t\t\t\t<input type=\"radio\" class=\"with-gap\" id=\"option-{{o.id}}\" [value]=\"o.value\" [checked]=\"form.controls[formControlId].value == o.value\" (click)=\"setOption(o.value)\" />\n\t\t\t\t<label [attr.for]=\"'option-' + o.id\">{{o.displayName}}</label>\n\t\t\t</span>\n\t\t</div>\n<div class=\"clearfix\"></div>\n    </div>\n",
        styles: [require('./brandingoptionpicker.component.css')]
    })
], BrandingOptionPickerComponent);
exports.BrandingOptionPickerComponent = BrandingOptionPickerComponent;
//# sourceMappingURL=brandingoptionpicker.component.js.map
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
var BrandingContentSectionComponent = (function () {
    function BrandingContentSectionComponent(fb) {
        this.fb = fb;
    }
    BrandingContentSectionComponent.prototype.addFormControls = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([], Validators.minLength(2));
        this.model.baseFeedPages.forEach(function (x, i) { return formArray.push(_this.initPage(x)); });
        this.form.addControl('baseFeedPages', formArray);
        this.form.controls['baseFeedPages'].setValidators([Validators.required, Validators1.minLengthArray(2), Validators.maxLength(5)]);
    };
    ;
    return BrandingContentSectionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BrandingContentSectionComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], BrandingContentSectionComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BrandingContentSectionComponent.prototype, "submitted", void 0);
BrandingContentSectionComponent = __decorate([
    core_1.Component({
        selector: 'branding-section',
        template: require('./brandingcontentsection.component.html'),
        styles: [require('./brandingcontentsection.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], BrandingContentSectionComponent);
exports.BrandingContentSectionComponent = BrandingContentSectionComponent;
//# sourceMappingURL=brandingcontentsection.component.js.map
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
var brandingservice_1 = require("../../../services/brandingservice");
var BrandingContentSectionComponent = (function () {
    function BrandingContentSectionComponent(fb, brandingService) {
        this.fb = fb;
        this.brandingService = brandingService;
        this.form = this.fb.group({});
    }
    BrandingContentSectionComponent.prototype.ngOnInit = function () {
        this.addFormControls();
    };
    BrandingContentSectionComponent.prototype.addFormControls = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([]);
        this.models.forEach(function (x, i) { return formArray.push(_this.initBrandingElement(x)); });
        this.form.addControl('brandingElements', formArray);
    };
    ;
    BrandingContentSectionComponent.prototype.initBrandingElement = function (model) {
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(model.id, []),
            masterId: new forms_1.FormControl(model.masterId, []),
            order: new forms_1.FormControl(model.order, []),
            enabled: new forms_1.FormControl(model.enabled, []),
            published: new forms_1.FormControl(model.published, []),
            createdAt: new forms_1.FormControl(model.createdAt, []),
            updatedAt: new forms_1.FormControl(model.updatedAt, []),
            value: new forms_1.FormControl(model.value, []),
            primaryImageId: new forms_1.FormControl(model.primaryImageId, []),
            secondaryImageId: new forms_1.FormControl(model.secondaryImageId, [])
        });
    };
    BrandingContentSectionComponent.prototype.save = function (form, isValid) {
        console.log(form.brandingElements);
        this.brandingService.updateBranding(form.brandingElements).subscribe(function (result) {
            console.log(result);
        });
    };
    return BrandingContentSectionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BrandingContentSectionComponent.prototype, "models", void 0);
BrandingContentSectionComponent = __decorate([
    core_1.Component({
        selector: 'branding-section',
        template: require('./brandingcontentsection.component.html'),
        styles: [require('./brandingcontentsection.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, brandingservice_1.BrandingService])
], BrandingContentSectionComponent);
exports.BrandingContentSectionComponent = BrandingContentSectionComponent;
//# sourceMappingURL=brandingcontentsection.component.js.map
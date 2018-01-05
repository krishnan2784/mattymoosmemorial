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
        this.submitted = false;
        this.form = this.fb.group({});
    }
    BrandingContentSectionComponent.prototype.ngOnInit = function () {
        this.addFormControls();
        this.calculateSubGroups();
    };
    BrandingContentSectionComponent.prototype.ngOnDestroy = function () {
        this.removeFormControls();
    };
    BrandingContentSectionComponent.prototype.ngOnChanges = function (changes) {
        if (changes['models']) {
            this.removeFormControls();
            this.addFormControls();
            this.calculateSubGroups();
        }
    };
    BrandingContentSectionComponent.prototype.addFormControls = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([]);
        this.models.forEach(function (x, i) { return formArray.push(_this.initBrandingElement(x)); });
        this.form.addControl('brandingElements', formArray);
    };
    ;
    BrandingContentSectionComponent.prototype.removeFormControls = function () {
        this.form.removeControl('brandingElements');
    };
    BrandingContentSectionComponent.prototype.initBrandingElement = function (model) {
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(model.id, []),
            order: new forms_1.FormControl(model.order, []),
            groupName: new forms_1.FormControl(model.groupName, []),
            value: new forms_1.FormControl(model.value, []),
            primaryImageId: new forms_1.FormControl(model.primaryImageId, []),
            secondaryImageId: new forms_1.FormControl(model.secondaryImageId, [])
        });
    };
    BrandingContentSectionComponent.prototype.calculateSubGroups = function () {
        this.subGroups = [];
        if (this.models)
            for (var i = 0; i < this.models.length; i++) {
                this.addSubGroup(this.models[i]);
            }
    };
    BrandingContentSectionComponent.prototype.addSubGroup = function (element) {
        var a = element.groupName.split('>');
        var n = (a.length > 1 ? a[1] : element.description);
        var m = this.subGroups.find(function (x) { return x[0] === n; });
        if (m)
            m[1].push(element);
        else
            this.subGroups.push([n, [element]]);
    };
    BrandingContentSectionComponent.prototype.save = function (form, isValid) {
        var _this = this;
        this.submitted = true;
        this.brandingService.updateBranding(form.brandingElements).subscribe(function (result) {
            _this.submitted = false;
        });
    };
    return BrandingContentSectionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BrandingContentSectionComponent.prototype, "models", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BrandingContentSectionComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BrandingContentSectionComponent.prototype, "brandingOptions", void 0);
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
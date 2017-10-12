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
var brandingclasses_1 = require("../../../../models/brandingclasses");
var enums_1 = require("../../../../enums");
var BaseBrandingComponent = (function () {
    function BaseBrandingComponent() {
        this.componentUpdated = new core_1.EventEmitter();
        this.brandingElementType = enums_1.BrandingElementType;
    }
    BaseBrandingComponent.prototype.ngOnInit = function () {
        console.log(this.form);
        console.log(this.model);
    };
    return BaseBrandingComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BaseBrandingComponent.prototype, "componentUpdated", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", brandingclasses_1.BrandingElement)
], BaseBrandingComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], BaseBrandingComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BaseBrandingComponent.prototype, "submitted", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], BaseBrandingComponent.prototype, "index", void 0);
BaseBrandingComponent = __decorate([
    core_1.Component({
        selector: 'base-branding-component',
        template: require('./basebrandingcomponent.component.html'),
        styles: [require('./basebrandingcomponent.component.css')]
    }),
    __metadata("design:paramtypes", [])
], BaseBrandingComponent);
exports.BaseBrandingComponent = BaseBrandingComponent;
//# sourceMappingURL=basebrandingcomponent.component.js.map
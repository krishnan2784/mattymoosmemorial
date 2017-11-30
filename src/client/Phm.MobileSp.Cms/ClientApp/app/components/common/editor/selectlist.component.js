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
var SelectListComponent = (function () {
    function SelectListComponent() {
        this.values = [];
        this.selectedValue = '';
        this.elementId = '';
        this.label = '';
        this.validationMessage = '';
        this.formSubmitted = false;
        this.disabled = false;
    }
    SelectListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //if (!this.selectedValue)
        //	this.selectedValue = this.values && this.values.length > 0 ? this.values[0] : {};
        $(document).ready(function () {
            $('#' + _this.elementId).material_select();
        });
    };
    return SelectListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SelectListComponent.prototype, "values", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectListComponent.prototype, "defaultValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectListComponent.prototype, "selectedValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], SelectListComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectListComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectListComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectListComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectListComponent.prototype, "validationMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectListComponent.prototype, "formSubmitted", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectListComponent.prototype, "disabled", void 0);
SelectListComponent = __decorate([
    core_1.Component({
        selector: 'selectlist',
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n\t        <label *ngIf=\"label\" [attr.for]=\"elementId\">{{label}}</label>\n\t        <select id=\"{{elementId}}\" formControlName=\"{{formControlId}}\" materialize=\"material_select\" [(ngModel)]=\"selectedValue\" class=\"browser-default\" [attr.disabled]=\"disabled ? 'disabled' : null\">\n\n\t\t        <option *ngFor=\"let v of values\" [ngValue]=\"v.value\">{{v.name}}</option>\n\t        </select>\n\t        <small *ngIf=\"validationMessage\" class=\"active-warning\" [class.hidden]=\"form.controls[formControlId].valid || !formSubmitted\">\n\t\t        {{validationMessage}}\n\t        </small>\n    </div>\n"
    })
], SelectListComponent);
exports.SelectListComponent = SelectListComponent;
//# sourceMappingURL=selectlist.component.js.map
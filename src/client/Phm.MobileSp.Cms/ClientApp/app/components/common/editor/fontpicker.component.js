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
var FontPickerComponent = (function () {
    function FontPickerComponent() {
        this.elementId = '';
        this.label = '';
        this.validationMessage = '';
        this.formSubmitted = false;
        this.maxLength = 0;
        this.disabled = false;
        this.availableFonts = ['Arial', 'Times New Roman'];
        this.activeClass = '';
    }
    FontPickerComponent.prototype.ngOnInit = function () {
        if (this.elementId == '')
            this.elementId = this.formControlId;
    };
    FontPickerComponent.prototype.ngAfterViewInit = function () {
    };
    return FontPickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], FontPickerComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FontPickerComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FontPickerComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FontPickerComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FontPickerComponent.prototype, "validationMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FontPickerComponent.prototype, "formSubmitted", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], FontPickerComponent.prototype, "maxLength", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FontPickerComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], FontPickerComponent.prototype, "availableFonts", void 0);
FontPickerComponent = __decorate([
    core_1.Component({
        selector: 'fontpicker',
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n\t    <h5 [attr.for]=\"elementId\">{{label}}</h5>\n\t    <select id=\"{{elementId}}\" formControlName=\"{{formControlId}}\">\n\t\t    <option *ngFor=\"let f of availableFonts\" value=\"{{f}}\" [attr.selected]=\"f==form.controls[formControlId].value ? 'selected' : null\" [style.font-family]=\"f\">{{f}}</option>\n\t    </select>\n    </div>\n",
        styles: [require('./fontpicker.component.css')]
    })
], FontPickerComponent);
exports.FontPickerComponent = FontPickerComponent;
//# sourceMappingURL=fontpicker.component.js.map
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
var CallToActionComponent = (function () {
    function CallToActionComponent() {
        this.buttonLabelLabel = '';
        this.urlLabel = '';
        this.formSubmitted = false;
    }
    CallToActionComponent.prototype.ngOnInit = function () {
    };
    return CallToActionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CallToActionComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CallToActionComponent.prototype, "additionalInfo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], CallToActionComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CallToActionComponent.prototype, "buttonLabelFormControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CallToActionComponent.prototype, "buttonLabelLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CallToActionComponent.prototype, "buttonLabelElementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CallToActionComponent.prototype, "urlFormControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CallToActionComponent.prototype, "urlLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CallToActionComponent.prototype, "urlElementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CallToActionComponent.prototype, "formSubmitted", void 0);
CallToActionComponent = __decorate([
    core_1.Component({
        selector: 'calltoaction',
        styles: ["\n.no-pad, .url-container, .additional-info{\npadding: 0;\n}\n.button-label-container{\npadding-left: 0;\n}\n.additional-info{\nmargin-top: 15px;\n}\n.button{\n\tmargin-top: 15px;\n}\n    a span {\ncursor:pointer;\n    }\n  "],
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n\t        <h5 *ngIf=\"title\">{{title}}</h5>\n\t        <div class=\"col-md-9 no-pad\">\n\t\t        <div class=\"col-md-4 button-label-container\">\n\t\t\t        <textinput [form]=\"form\" [formSubmitted]=\"formSubmitted\"\n\t\t\t                   [formControlId]=\"buttonLabelFormControlId\"\n\t\t\t                   [elementId]=\"buttonLabelElementId\"\n\t\t\t                   [label]=\"buttonLabelLabel\"\n\t\t\t\t\t\t\t   [maxLength]=\"16\"></textinput>\n\t\t        </div>\n\t\t        <div class=\"col-md-8 url-container\">\n\t\t\t        <textinput [form]=\"form\" [formSubmitted]=\"formSubmitted\"\n\t\t\t                   [formControlId]=\"urlFormControlId\"\n\t\t\t                   [elementId]=\"urlElementId\"\n\t\t\t                   [label]=\"urlLabel\"></textinput>\n\t\t        </div>\n\t\t        <div class=\"clearfix\"></div>\n\t\t        <small *ngIf=\"additionalInfo\" class=\"col-lg-12 additional-info\">\n\t\t\t        {{additionalInfo}}\n\t\t        </small>\n\t        </div>\n\t        <div class=\"col-md-3\">\n\t\t        <a class=\"button btn\" *ngIf=\"form.controls[urlFormControlId].value && form.controls[urlFormControlId].value.length>5\" \n\t\t           href=\"{{form.controls[urlFormControlId].value.indexOf('http') === 0 ? form.controls[urlFormControlId].value : 'http://' + form.controls[urlFormControlId].value}}\" target=\"_blank\">\n\t\t\t        <span [innerHtml]=\"form.controls[buttonLabelFormControlId].value && form.controls[buttonLabelFormControlId].value.length > 0 ? form.controls[buttonLabelFormControlId].value : 'Test URL'\"></span>\n\t\t        </a>\n\t        </div>\n\t        <div class=\"clearfix\"></div>\n    </div>\n"
    })
], CallToActionComponent);
exports.CallToActionComponent = CallToActionComponent;
//# sourceMappingURL=calltoaction.component.js.map
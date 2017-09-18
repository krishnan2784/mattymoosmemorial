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
var TextAreaComponent = (function () {
    function TextAreaComponent() {
        this.value = '';
        this.maxLength = 0;
        this.disabled = false;
        this.label = '';
        this.validationMessage = '';
        this.formSubmitted = false;
        this.onEditorKeyup = new core_1.EventEmitter();
        this.activeClass = '';
    }
    TextAreaComponent.prototype.ngOnInit = function () {
        if (this.form.controls[this.formControlId].value == null)
            this.form.controls[this.formControlId].setValue('');
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId])
            this.activeClass = this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
    };
    TextAreaComponent.prototype.ngAfterViewInit = function () {
        $('#' + this.elementId).trigger('autoresize').characterCounter();
    };
    TextAreaComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    return TextAreaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], TextAreaComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TextAreaComponent.prototype, "maxLength", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TextAreaComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaComponent.prototype, "validationMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TextAreaComponent.prototype, "formSubmitted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TextAreaComponent.prototype, "onEditorKeyup", void 0);
TextAreaComponent = __decorate([
    core_1.Component({
        selector: 'enhancedtextarea',
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n        <div class=\"input-field\">\n              <label [attr.for]=\"elementId\" class=\"{{activeClass}}\">{{label}}</label>\n              <textarea id=\"{{elementId}}\" formControlName=\"{{formControlId}}\" *ngIf=\"formControlId\" class=\"materialize-textarea\" [attr.maxLength]=\"maxLength > 0 ? maxLength : null\" [attr.data-length]=\"maxLength > 0 ? maxLength : null\" [attr.disabled]=\"disabled ? disabled : null\"></textarea>\n                <small class=\"active-warning\" [class.hidden]=\"form.controls[formControlId].valid || !formSubmitted\">\n                    {{validationMessage}}\n                </small>\n        </div>\n    </div>"
    })
], TextAreaComponent);
exports.TextAreaComponent = TextAreaComponent;
//# sourceMappingURL=textarea.component.js.map
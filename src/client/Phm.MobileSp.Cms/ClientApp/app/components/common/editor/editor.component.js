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
var RichTextEditorComponent = (function () {
    function RichTextEditorComponent() {
        this.value = '';
        this.maxLength = 0;
        this.disabled = false;
        this.label = '';
        this.validationMessage = '';
        this.formSubmitted = false;
        this.onEditorKeyup = new core_1.EventEmitter();
        this.activeClass = '';
    }
    RichTextEditorComponent.prototype.ngOnInit = function () {
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId])
            this.activeClass = this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
    };
    RichTextEditorComponent.prototype.ngAfterViewInit = function () {
        //tinymce.init({
        //  selector: '#' + this.elementId,
        //  plugins: ['link', 'paste', 'table','autoresize'],
        //  setup: editor => {
        //    this.editor = editor;
        //    editor.on('keyup', () => {
        //        const content = editor.getContent();
        //        this.value = content;
        //        this.formGroup.controls[this.elementId].patchValue(content, {});
        //        this.formGroup.markAsDirty();
        //        this.onEditorKeyup.emit({ id: this.elementId, val: content });
        //    });
        //  },
        //  });
        $('#' + this.elementId).trigger('autoresize').characterCounter();
    };
    RichTextEditorComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    return RichTextEditorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], RichTextEditorComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RichTextEditorComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RichTextEditorComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RichTextEditorComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RichTextEditorComponent.prototype, "maxLength", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RichTextEditorComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RichTextEditorComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RichTextEditorComponent.prototype, "validationMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RichTextEditorComponent.prototype, "formSubmitted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RichTextEditorComponent.prototype, "onEditorKeyup", void 0);
RichTextEditorComponent = __decorate([
    core_1.Component({
        selector: 'editor',
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n        <div class=\"input-field\">\n              <label [attr.for]=\"elementId\" class=\"{{activeClass}}\">{{label}}</label>\n              <textarea id=\"{{elementId}}\" formControlName=\"{{formControlId}}\" *ngIf=\"formControlId\" class=\"materialize-textarea\" [attr.maxLength]=\"maxLength > 0 ? maxLength : null\" [attr.data-length]=\"maxLength > 0 ? maxLength : null\" [attr.disabled]=\"disabled ? disabled : null\"></textarea>\n                <small class=\"active-warning\" [class.hidden]=\"form.controls[formControlId].valid || !formSubmitted\">\n                    {{validationMessage}}\n                </small>\n        </div>\n    </div>"
    })
], RichTextEditorComponent);
exports.RichTextEditorComponent = RichTextEditorComponent;
//`
//    <div [formGroup]="formGroup" *ngIf="formGroup">
//      <input type="hidden" formControlName="{{elementId}}" *ngIf="elementId" value={{value}}>
//    </div>
//<textarea id="{{elementId}}">{{value}}</textarea>` 
//# sourceMappingURL=editor.component.js.map
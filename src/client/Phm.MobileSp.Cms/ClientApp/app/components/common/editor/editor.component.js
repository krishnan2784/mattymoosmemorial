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
        this.onEditorKeyup = new core_1.EventEmitter();
    }
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
        $('#' + this.elementId).trigger('autoresize');
    };
    RichTextEditorComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    return RichTextEditorComponent;
}());
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
    __metadata("design:type", forms_1.FormGroup)
], RichTextEditorComponent.prototype, "formGroup", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RichTextEditorComponent.prototype, "maxLength", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RichTextEditorComponent.prototype, "onEditorKeyup", void 0);
RichTextEditorComponent = __decorate([
    core_1.Component({
        selector: 'editor',
        template: "\n    <div [formGroup]=\"formGroup\" *ngIf=\"formGroup\">\n      <textarea id=\"{{elementId}}\" formControlName=\"{{elementId}}\" *ngIf=\"elementId\" value={{value}} class=\"materialize-textarea\" [attr.maxLength]=\"maxLength > 0 ? maxLength : null\"></textarea>\n    </div>"
    })
], RichTextEditorComponent);
exports.RichTextEditorComponent = RichTextEditorComponent;
//`
//    <div [formGroup]="formGroup" *ngIf="formGroup">
//      <input type="hidden" formControlName="{{elementId}}" *ngIf="elementId" value={{value}}>
//    </div>
//<textarea id="{{elementId}}">{{value}}</textarea>` 
//# sourceMappingURL=editor.component.js.map
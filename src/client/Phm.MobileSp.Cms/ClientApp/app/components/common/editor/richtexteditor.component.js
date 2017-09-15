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
        this.currentChars = 0;
        this.editing = false;
        this.toggleEdit = this.toggleEditing.bind(this);
        this.setupValue = this.setValue.bind(this);
    }
    RichTextEditorComponent.prototype.ngOnInit = function () {
        if (this.form.controls[this.formControlId].value == null)
            this.form.controls[this.formControlId].setValue('');
        if (this.elementId == '')
            this.elementId = this.formControlId;
    };
    RichTextEditorComponent.prototype.ngAfterViewInit = function () {
        this.initTinyMce();
    };
    RichTextEditorComponent.prototype.initTinyMce = function () {
        var _this = this;
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'paste', 'table', 'autoresize'],
            setup: function (editor) {
                _this.editor = editor;
                setTimeout(function () { return _this.setValue(); }, 10);
                editor.on('keyup', function () {
                    var content = editor.getContent();
                    _this.value = content;
                    _this.form.controls[_this.formControlId].patchValue(content, {});
                    _this.form.markAsDirty();
                    _this.onEditorKeyup.emit({ id: _this.elementId, val: content });
                });
                editor.on('keydown', function () {
                    if (_this.maxLength === 0)
                        return;
                    _this.currentChars = $.trim(tinymce.activeEditor.getContent().replace(/(<([^>]+)>)/ig, "")).length;
                    if (_this.currentChars > _this.maxLength - 1) {
                        editor.stopPropagation();
                        editor.preventDefault();
                    }
                });
                editor.on('mousedown ', function () {
                    _this.toggleEdit(true);
                });
                editor.on('blur', function () {
                    _this.toggleEdit(false);
                });
            },
        });
    };
    RichTextEditorComponent.prototype.toggleEditing = function (currentlyEditing) {
        this.editing = currentlyEditing;
    };
    RichTextEditorComponent.prototype.setValue = function () {
        tinymce.get(this.elementId).setContent(this.form.controls[this.formControlId].value);
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
        selector: 'richtexteditor',
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n        <input type=\"hidden\" formControlName=\"{{formControlId}}\" *ngIf=\"formControlId\">\n        <label [class.active]=\"editing\">{{label}}</label>\n        <textarea id=\"{{elementId}}\" [attr.disabled]=\"disabled ? disabled : null\">\n            {{value}}\n        </textarea>\n        <span class=\"character-counter\" style=\"float: right; font-size: 12px; height: 1px;\" *ngIf=\"maxLength > 0 && editing\">\n            {{currentChars}}/{{maxLength}}\n        </span>\n        <small class=\"active-warning\" [class.hidden]=\"form.controls[formControlId].valid || !formSubmitted\">\n            {{validationMessage}}\n        </small>\n        <div class=\"clearfix\"></div>\n    </div>"
    })
], RichTextEditorComponent);
exports.RichTextEditorComponent = RichTextEditorComponent;
//# sourceMappingURL=richtexteditor.component.js.map
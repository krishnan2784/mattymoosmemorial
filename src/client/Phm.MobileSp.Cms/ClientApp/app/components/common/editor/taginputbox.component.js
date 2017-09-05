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
var TagInputComponent = (function () {
    function TagInputComponent() {
        this.elementId = '';
        this.label = '';
        this.validationMessage = '';
        this.formSubmitted = false;
        this.maxLength = 0;
        this.activeClass = '';
    }
    TagInputComponent.prototype.ngOnInit = function () {
        if (this.elementId === '')
            this.elementId = this.formControlId;
    };
    TagInputComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('#' + this.elementId).tagsinput({
            trimValue: true,
            maxTags: this.maxLength,
            tagClass: 'primaryBackgroundColour'
            // we can use this to get a list of tags for autofilling
            //, typeahead: {
            //    source: (query) => {
            //        return $.get('http://someservice.com');
            //    }
            //}
        });
        $('.tag-contrainer input').keydown(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                $('#' + _this.elementId).tagsinput('add', $('.tag-contrainer input').val());
                $('.tag-contrainer input').val('');
            }
        });
        $('#' + this.elementId).on('itemAdded', function (event) {
            _this.setFormValue();
        });
        $('#' + this.elementId).on('itemRemoved', function (event) {
            _this.setFormValue();
        });
    };
    TagInputComponent.prototype.setFormValue = function () {
        this.form.controls[this.formControlId].setValue($('#' + this.elementId).val());
    };
    return TagInputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], TagInputComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "validationMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "formSubmitted", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TagInputComponent.prototype, "maxLength", void 0);
TagInputComponent = __decorate([
    core_1.Component({
        selector: 'taginputbox',
        template: "\n    <div [formGroup]=\"form\" *ngIf=\"form\">\n        <div class=\"input-field\">\n            <label [attr.for]=\"elementId\" class=\"active\">{{label}}</label>\n            <input type=\"hidden\" formControlName=\"{{formControlId}}\">\n            <div class=\"tag-contrainer\">\n                <input type=\"text\" id=\"{{elementId}}\" data-role=\"tagsinput\" value=\"{{form.controls[this.formControlId].value}}\">\n            </div>\n            <small class=\"active-warning\" [class.hidden]=\"form.controls[formControlId].valid || !formSubmitted\">\n                {{validationMessage}}\n            </small>\n        </div>\n    </div>\n",
        styles: [require('./taginputbox.component.css')]
    })
], TagInputComponent);
exports.TagInputComponent = TagInputComponent;
//# sourceMappingURL=taginputbox.component.js.map
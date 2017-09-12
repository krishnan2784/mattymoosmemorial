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
var PagedFeedClasses = require("../../../../models/pagedfeedclasses");
var MediaTabbedTextFeedPage = PagedFeedClasses.MediaTabbedTextFeedPage;
var TabText = PagedFeedClasses.TabText;
var MediaTabbedTextPageFormComponent = (function () {
    function MediaTabbedTextPageFormComponent() {
        this.currentTab = 0;
        this.uploadedMedia = new core_1.EventEmitter;
    }
    MediaTabbedTextPageFormComponent.prototype.ngOnInit = function () {
        console.log(this.model);
        this.model = new MediaTabbedTextFeedPage(this.model);
        this.addFormControls();
    };
    MediaTabbedTextPageFormComponent.prototype.currTab = function () {
        var tabs = this.form.controls['tabs'];
        return tabs.controls[this.currentTab];
    };
    MediaTabbedTextPageFormComponent.prototype.addFormControls = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([], forms_1.Validators.minLength(2));
        this.model.tabs.forEach(function (x, i) { return formArray.push(_this.initTab(x)); });
        this.form.addControl('tabs', formArray);
        this.form.controls['tabs'].setValidators(forms_1.Validators.maxLength(3));
        this.form.addControl('mediaInfoId', new forms_1.FormControl(this.model.mediaInfoId, [forms_1.Validators.required]));
    };
    ;
    MediaTabbedTextPageFormComponent.prototype.initTab = function (tab) {
        if (tab === void 0) { tab = null; }
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(tab.id, []),
            masterId: new forms_1.FormControl(tab.masterId, []),
            order: new forms_1.FormControl(tab.order, []),
            enabled: new forms_1.FormControl(tab.enabled, []),
            published: new forms_1.FormControl(tab.published, []),
            mediaTabbedTextFeedtabId: new forms_1.FormControl(tab.mediaTabbedTextFeedPageId, []),
            bodyText: new forms_1.FormControl(tab.bodyText, [forms_1.Validators.required]),
            title: new forms_1.FormControl(tab.title, [])
        });
    };
    MediaTabbedTextPageFormComponent.prototype.addTab = function () {
        var control = this.form.controls['tabs'];
        control.push(this.initTab(new TabText()));
        this.displayTab(control.length - 1);
    };
    MediaTabbedTextPageFormComponent.prototype.removeTab = function (index) {
        var control = this.form.controls['tabs'];
        if (this.currentTab > 0)
            this.displayTab(this.currentTab - 1);
        control.removeAt(index);
        this.form.markAsDirty();
    };
    MediaTabbedTextPageFormComponent.prototype.displayTab = function (index) {
        var tabs = this.form.controls['tabs'];
        if (index < 0 || index > (tabs.length - 1))
            return;
        this.currentTab = index;
    };
    MediaTabbedTextPageFormComponent.prototype.attachMedia = function (media) {
        this.uploadedMedia.emit(media);
    };
    return MediaTabbedTextPageFormComponent;
}());
__decorate([
    core_1.Input('form'),
    __metadata("design:type", forms_1.FormGroup)
], MediaTabbedTextPageFormComponent.prototype, "form", void 0);
__decorate([
    core_1.Input('model'),
    __metadata("design:type", MediaTabbedTextFeedPage)
], MediaTabbedTextPageFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input('index'),
    __metadata("design:type", Number)
], MediaTabbedTextPageFormComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MediaTabbedTextPageFormComponent.prototype, "submitted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MediaTabbedTextPageFormComponent.prototype, "uploadedMedia", void 0);
MediaTabbedTextPageFormComponent = __decorate([
    core_1.Component({
        selector: 'media-tabbed-text-page-form',
        template: require('./mediatabbedtextpageform.component.html'),
        styles: [require('./mediatabbedtextpageform.component.css')]
    })
], MediaTabbedTextPageFormComponent);
exports.MediaTabbedTextPageFormComponent = MediaTabbedTextPageFormComponent;
//# sourceMappingURL=mediatabbedtextpageform.component.js.map
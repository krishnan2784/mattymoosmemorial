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
var Pagedfeedclasses = require("../../../../models/pagedfeedclasses");
var MediaTextFeedPage = Pagedfeedclasses.MediaTextFeedPage;
var MediaTextPageFormComponent = (function () {
    function MediaTextPageFormComponent() {
        this.uploadedMedia = new core_1.EventEmitter;
    }
    MediaTextPageFormComponent.prototype.ngOnInit = function () {
        this.model = new MediaTextFeedPage(this.model);
        this.addFormControls();
    };
    MediaTextPageFormComponent.prototype.addFormControls = function () {
        this.form.addControl('bodyText', new forms_1.FormControl(this.model.bodyText, [forms_1.Validators.required]));
        this.form.addControl('mediaInfoId', new forms_1.FormControl(this.model.mediaInfoId, [forms_1.Validators.required]));
    };
    ;
    MediaTextPageFormComponent.prototype.attachMedia = function (media) {
        this.uploadedMedia.emit(media);
    };
    return MediaTextPageFormComponent;
}());
__decorate([
    core_1.Input('form'),
    __metadata("design:type", forms_1.FormGroup)
], MediaTextPageFormComponent.prototype, "form", void 0);
__decorate([
    core_1.Input('model'),
    __metadata("design:type", MediaTextFeedPage)
], MediaTextPageFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input('index'),
    __metadata("design:type", Number)
], MediaTextPageFormComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MediaTextPageFormComponent.prototype, "submitted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MediaTextPageFormComponent.prototype, "uploadedMedia", void 0);
MediaTextPageFormComponent = __decorate([
    core_1.Component({
        selector: 'media-text-page-form',
        template: require('./mediatextpageform.component.html')
    })
], MediaTextPageFormComponent);
exports.MediaTextPageFormComponent = MediaTextPageFormComponent;
//# sourceMappingURL=mediatextpageform.component.js.map
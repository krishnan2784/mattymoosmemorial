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
var mediaservice_1 = require("../../../../services/mediaservice");
var MediaPageFormComponent = (function () {
    function MediaPageFormComponent(mediaDataService) {
        this.mediaDataService = mediaDataService;
        this.uploadedMedia = new core_1.EventEmitter;
        this.mediaUploading = new core_1.EventEmitter();
    }
    MediaPageFormComponent.prototype.ngOnInit = function () {
        this.getMediaInfo();
        this.addFormControls();
    };
    MediaPageFormComponent.prototype.ngOnDestroy = function () {
        this.removeFormControls();
    };
    MediaPageFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes['model']) {
            this.getMediaInfo();
        }
    };
    MediaPageFormComponent.prototype.addFormControls = function () {
        var _this = this;
        setTimeout(function () {
            _this.form.addControl('mediaInfoId', new forms_1.FormControl(_this.model.mediaInfoId, [forms_1.Validators.required]));
        }, 10);
    };
    ;
    MediaPageFormComponent.prototype.removeFormControls = function () {
        this.form.removeControl('mediaInfoId');
    };
    ;
    MediaPageFormComponent.prototype.getMediaInfo = function () {
        var _this = this;
        if (this.model && this.model.mediaInfoId > 0 && (!this.model.mediaInfo || this.model.mediaInfoId !== this.model.mediaInfo.id)) {
            this.mediaDataService.getMediaInfo(this.model.mediaInfoId).subscribe(function (result) {
                _this.model.mediaInfo = result;
            });
        }
    };
    MediaPageFormComponent.prototype.attachMedia = function (media) {
        if (media && media.id > 0)
            this.uploadedMedia.emit({ media: media, index: this.index });
    };
    return MediaPageFormComponent;
}());
__decorate([
    core_1.Input('form'),
    __metadata("design:type", forms_1.FormGroup)
], MediaPageFormComponent.prototype, "form", void 0);
__decorate([
    core_1.Input('model'),
    __metadata("design:type", Object)
], MediaPageFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input('index'),
    __metadata("design:type", Number)
], MediaPageFormComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MediaPageFormComponent.prototype, "submitted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MediaPageFormComponent.prototype, "uploadedMedia", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MediaPageFormComponent.prototype, "mediaUploading", void 0);
MediaPageFormComponent = __decorate([
    core_1.Component({
        selector: 'media-page-form',
        template: require('./mediapageform.component.html')
    }),
    __metadata("design:paramtypes", [mediaservice_1.MediaDataService])
], MediaPageFormComponent);
exports.MediaPageFormComponent = MediaPageFormComponent;
//# sourceMappingURL=mediapageform.component.js.map
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
var Mediaservice = require("../../services/mediaservice");
var MediaDataService = Mediaservice.MediaDataService;
var UploadMediaComponent = (function () {
    function UploadMediaComponent(mediaService) {
        this.mediaService = mediaService;
        this.showPreview = true;
        this.files = [];
        this.uploading = false;
        this.mediaUploaded = new core_1.EventEmitter();
    }
    UploadMediaComponent.prototype.uploadFile = function () {
        if (!this.files)
            return;
        this.uploading = true;
        for (var _i = 0, _a = this.files; _i < _a.length; _i++) {
            var file = _a[_i];
            switch (file.type) {
                case 'jpg':
                case 'png':
                    this.uploadImage(file);
                    return;
                default:
                    this.uploadVideo(file);
                    return;
            }
        }
    };
    UploadMediaComponent.prototype.uploadVideo = function (file) {
        var _this = this;
        this.mediaService.uploadFile(file).subscribe(function (response) {
            _this.processUploadResponse(response);
        });
    };
    UploadMediaComponent.prototype.uploadImage = function (file) {
        var _this = this;
        this.mediaService.uploadImage(file).subscribe(function (response) {
            _this.processUploadResponse(response);
        });
    };
    UploadMediaComponent.prototype.processUploadResponse = function (media) {
        this.uploading = false;
        if (media) {
            this.imagePreviewUrl = media.path + media.name;
            this.mediaUploaded.emit(media);
        }
    };
    UploadMediaComponent.prototype.filesSelectHandler = function (fileInput) {
        var FileList = fileInput.target.files;
        for (var i = 0, length_1 = FileList.length; i < length_1; i++) {
            this.files.push(FileList.item(i));
        }
    };
    return UploadMediaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UploadMediaComponent.prototype, "showPreview", void 0);
UploadMediaComponent = __decorate([
    core_1.Injectable(),
    core_1.Component({
        selector: 'upload',
        template: require('./upload.component.html'),
        styles: [require('./upload.component.css')]
    }),
    __metadata("design:paramtypes", [MediaDataService])
], UploadMediaComponent);
exports.UploadMediaComponent = UploadMediaComponent;
//# sourceMappingURL=upload.component.js.map
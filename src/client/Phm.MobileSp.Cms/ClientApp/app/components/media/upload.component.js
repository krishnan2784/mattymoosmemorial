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
var mediainfoclasses_1 = require("../../models/mediainfoclasses");
var enums_1 = require("../../enums");
var MediaDataService = Mediaservice.MediaDataService;
var UploadMediaComponent = (function () {
    function UploadMediaComponent(mediaService) {
        this.mediaService = mediaService;
        this.showPreview = true;
        this.selectedMedia = null;
        this.uploaderType = enums_1.UploaderType.Any;
        this.files = [];
        this.uploading = false;
        this.uploaderTypes = enums_1.UploaderType;
        this.correctType = true;
        this.mediaUploaded = new core_1.EventEmitter();
    }
    UploadMediaComponent.prototype.ngOnInit = function () {
        console.log(this.selectedMedia);
        if (this.selectedMedia)
            this.setPreviewImage();
    };
    UploadMediaComponent.prototype.uploadFile = function () {
        var _this = this;
        if (!this.files)
            return;
        this.uploading = true;
        this.imagePreviewUrl = '';
        this.mediaUploaded.emit(new mediainfoclasses_1.MediaInfo());
        for (var _i = 0, _a = this.files; _i < _a.length; _i++) {
            var file = _a[_i];
            if (this.fileTypeIsValid(file)) {
                this.mediaService.uploadFile(file).subscribe(function (response) {
                    _this.processUploadResponse(response);
                    _this.files.splice(0);
                });
            }
        }
    };
    UploadMediaComponent.prototype.processUploadResponse = function (media) {
        this.uploading = false;
        media = new mediainfoclasses_1.MediaInfo(media);
        this.selectedMedia = media;
        if (media.id > 0) {
            this.setPreviewImage();
            this.mediaUploaded.emit(media);
        }
        else
            Materialize.toast("An error occurred during the upload process.", 5000, 'red');
    };
    UploadMediaComponent.prototype.notValidAlert = function () {
        Materialize.toast("Please select a valid media type.", 5000, 'red');
    };
    UploadMediaComponent.prototype.setPreviewImage = function () {
        if (!this.selectedMedia)
            return;
        if (this.selectedMedia.mediaType == enums_1.MediaTypes.Image)
            this.imagePreviewUrl = this.selectedMedia.azureUrl;
        else if (this.selectedMedia.mediaType == enums_1.MediaTypes.Video)
            this.videoPreviewUrl = this.selectedMedia.azureUrl;
    };
    UploadMediaComponent.prototype.filesSelectHandler = function (fileInput) {
        var FileList = fileInput.target.files;
        for (var i = 0, length_1 = FileList.length; i < length_1; i++) {
            if (this.fileTypeIsValid(FileList.item(i))) {
                this.files.push(FileList.item(i));
            }
            else {
                this.correctType = false;
                this.notValidAlert();
                this.files.splice(i, 1);
            }
        }
    };
    UploadMediaComponent.prototype.fileTypeIsValid = function (file) {
        switch (this.uploaderType) {
            case enums_1.UploaderType.Any:
                return true;
            case enums_1.UploaderType.Image:
                return file.type.indexOf('image') > -1;
            case enums_1.UploaderType.Video:
                return file.type.indexOf('video') > -1;
            case enums_1.UploaderType.ImageAndVideo:
                return file.type.indexOf('image') > -1 || file.type.indexOf('.ideo') > -1;
        }
        return false;
    };
    return UploadMediaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UploadMediaComponent.prototype, "showPreview", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", mediainfoclasses_1.MediaInfo)
], UploadMediaComponent.prototype, "selectedMedia", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], UploadMediaComponent.prototype, "uploaderType", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], UploadMediaComponent.prototype, "mediaUploaded", void 0);
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
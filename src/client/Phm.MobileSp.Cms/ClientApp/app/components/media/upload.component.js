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
var Mediaservice = require("../../services/mediaservice");
var mediainfoclasses_1 = require("../../models/mediainfoclasses");
var enums_1 = require("../../enums");
var MediaDataService = Mediaservice.MediaDataService;
var UploadMediaComponent = (function () {
    function UploadMediaComponent(mediaService) {
        this.mediaService = mediaService;
        this.title = "";
        this.showPreview = true;
        this.previewText = "Preview";
        this.selectedMedia = null;
        this.uploaderType = enums_1.UploaderType.Any;
        this.maxSizeBytes = 104857600; // 100mb
        this.enforceExactDimensions = false;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.uploadUrl = '/Media/UploadFile';
        this.disabled = false;
        this.files = [];
        this.uploading = false;
        this.uploaderTypes = enums_1.UploaderType;
        this.correctType = true;
        this.mediaUploading = new core_1.EventEmitter();
        this.mediaUploaded = new core_1.EventEmitter();
    }
    UploadMediaComponent.prototype.ngOnInit = function () {
        if (this.selectedMedia)
            this.setPreviewImage(this.selectedMedia.azureUrl);
    };
    UploadMediaComponent.prototype.uploadFile = function () {
        var _this = this;
        if (!this.files)
            return;
        this.uploading = true;
        this.mediaUploading.emit(true);
        this.imagePreviewUrl = '';
        this.videoPreviewUrl = '';
        this.mediaUploaded.emit(new mediainfoclasses_1.MediaInfo());
        for (var _i = 0, _a = this.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.mediaService.uploadFile(file, this.uploadUrl).subscribe(function (response) {
                _this.processUploadResponse(response);
                _this.files.splice(0);
            });
        }
    };
    UploadMediaComponent.prototype.processUploadResponse = function (media) {
        this.selectedMedia = media;
        if (media.id > 0) {
            this.setPreviewImage(this.selectedMedia.azureUrl);
            this.setFormValue();
            this.mediaUploaded.emit(media);
        }
        else
            this.failAlert("An error occurred during the upload process.");
        this.uploading = false;
        this.mediaUploading.emit(false);
    };
    UploadMediaComponent.prototype.failAlert = function (message) {
        Materialize.toast(message, 5000, 'red');
    };
    UploadMediaComponent.prototype.setPreviewImage = function (url) {
        if (this.selectedMedia.mediaType == enums_1.MediaTypes.Image)
            this.imagePreviewUrl = url;
        else if (this.selectedMedia.mediaType == enums_1.MediaTypes.Video)
            this.videoPreviewUrl = url;
    };
    UploadMediaComponent.prototype.setFormValue = function () {
        if (!this.selectedMedia)
            return;
        if (this.form)
            this.form.controls[this.formControlId].patchValue(this.selectedMedia.azureUrl, {});
    };
    UploadMediaComponent.prototype.filesSelectHandler = function (fileInput) {
        var FileList = fileInput.target.files;
        var _loop_1 = function (i, length_1) {
            if (FileList.item(i).type.indexOf('image') > -1) {
                img = new Image();
                img.src = window.URL.createObjectURL(FileList.item(i));
                processFile = this_1.processFile.bind(this_1);
                img.onload = function () {
                    var width = img.naturalWidth, height = img.naturalHeight;
                    window.URL.revokeObjectURL(img.src);
                    processFile(FileList.item(i), i, width, height);
                };
            }
            else {
                this_1.processFile(FileList.item(i), i);
            }
        };
        var this_1 = this, img, processFile;
        for (var i = 0, length_1 = FileList.length; i < length_1; i++) {
            _loop_1(i, length_1);
        }
    };
    UploadMediaComponent.prototype.processFile = function (file, index, width, height) {
        if (index === void 0) { index = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (this.fileIsValid(file, width, height)) {
            this.files.push(file);
        }
        else {
            this.correctType = false;
            this.files.splice(index, 1);
        }
    };
    UploadMediaComponent.prototype.fileIsValid = function (file, width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var isValid = true;
        var failMessage;
        stillValid: {
            switch (this.uploaderType) {
                case enums_1.UploaderType.Any:
                    isValid = true;
                    break;
                case enums_1.UploaderType.Image:
                    isValid = file.type.indexOf('image') > -1;
                    break;
                case enums_1.UploaderType.Video:
                    isValid = file.type.indexOf('video') > -1;
                    break;
                case enums_1.UploaderType.ImageAndVideo:
                    isValid = file.type.indexOf('image') > -1 || file.type.indexOf('.ideo') > -1;
                    break;
            }
            if (!isValid) {
                this.correctType = false;
                failMessage = "Please select a valid media type.";
                break stillValid;
            }
            else
                this.correctType = true;
            if (file.size > this.maxSizeBytes) {
                isValid = false;
                failMessage = "The selected file is too large. Please select a file smaller than " + this.maxSizeBytes / 1024 / 1024 + "MB.";
                break stillValid;
            }
            if (this.enforceExactDimensions) {
                if (width != this.maxWidth || height != this.maxHeight) {
                    isValid = false;
                    failMessage = "The selected file does not meet the width and height requirements. (" + this.maxWidth + "px X " + this.maxHeight + "px)";
                    break stillValid;
                }
            }
            else {
                if ((this.maxWidth > 0 && width > this.maxWidth) || (this.maxHeight > 0 && height > this.maxHeight)) {
                    isValid = false;
                    failMessage = "The selected file is too large. Please uplaod a file smaller than " + this.maxWidth + "px X " + this.maxHeight + "px.";
                    break stillValid;
                }
            }
        }
        if (!isValid)
            this.failAlert(failMessage);
        return isValid;
    };
    return UploadMediaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UploadMediaComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UploadMediaComponent.prototype, "showPreview", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UploadMediaComponent.prototype, "previewText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", mediainfoclasses_1.MediaInfo)
], UploadMediaComponent.prototype, "selectedMedia", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], UploadMediaComponent.prototype, "uploaderType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], UploadMediaComponent.prototype, "maxSizeBytes", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UploadMediaComponent.prototype, "enforceExactDimensions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], UploadMediaComponent.prototype, "maxWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], UploadMediaComponent.prototype, "maxHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UploadMediaComponent.prototype, "uploadUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], UploadMediaComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UploadMediaComponent.prototype, "formControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UploadMediaComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UploadMediaComponent.prototype, "imagePreviewUrl", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], UploadMediaComponent.prototype, "mediaUploading", void 0);
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
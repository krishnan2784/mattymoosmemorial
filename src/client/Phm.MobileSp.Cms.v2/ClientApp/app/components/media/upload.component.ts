import { Component, EventEmitter, Injectable, OnInit, OnChanges, Input, Output, SimpleChange } from '@angular/core';
import {MediaInfo} from "../../models/mediainfoclasses";
import {MediaDataService} from "../../shared/services/mediaservice";
import { FormGroup } from '@angular/forms';
import { AlertService } from "../../shared/services/helpers/alertservice";
import {UploaderType,  MediaTypes } from "../../../enums";


@Injectable()
@Component({
    selector: 'upload',
    template: require('./upload.component.html'),
    styles: [require('./upload.component.css')]
})
export class UploadMediaComponent implements OnInit, OnChanges {

    @Input() title: string = "";
    @Input() showPreview: boolean = true;
    @Input() previewText: string = "Preview";
    @Input() selectedMedia: MediaInfo = null;
    @Input() uploaderType: UploaderType = UploaderType.Any;
    @Input() maxSizeBytes: number = 104857600; // 100mb
    @Input() enforceExactDimensions: boolean = false;
    @Input() maxWidth: number = 0;
    @Input() maxHeight: number = 0;
    @Input() uploadUrl = '/Media/UploadFile';
	@Input() form: FormGroup;
	@Input() formControlId: string;
	@Input() validationMessage: string = '';
	@Input() formSubmitted: boolean = false;
	@Input() elementId: string;
	@Input() savePreviewUrl: boolean = false;
	@Input() disabled: boolean = false;
	@Input() imagePreviewUrl: string;
	@Input() dimensionWarning: boolean = false;
	@Input() canClear: boolean = false;
	@Input() canUploadMultipleFiles: boolean = false;
    public files: File[] = [];
    public uploading: boolean = false;
	public filePath: string;
	public acceptString: string = 'video/mp4,image/png,image/jpg,image/jpeg';

    public videoPreviewUrl: string;
    uploaderTypes: typeof UploaderType = UploaderType;
    public correctType: boolean = true;
    @Output()
    public mediaUploading: EventEmitter<boolean> = new EventEmitter();
    @Output()
    public mediaUploaded: EventEmitter<any> = new EventEmitter();

	btnSaveId = 'btn-save';
	btnClearId = 'btn-clear';
	btnPickerId = 'btn-picker';
	inputMediaPathId = 'media-input';

    constructor(public mediaService: MediaDataService, public alertService: AlertService) {
    }

    ngOnInit() {       
      if (this.selectedMedia)
        this.setPreviewImage(this.selectedMedia.azureUrl);
		  else if (this.form && !this.savePreviewUrl && this.form.controls[this.formControlId] && this.form.controls[this.formControlId].value > 0) {
			  this.mediaService.getMediaInfo(this.form.controls[this.formControlId].value).subscribe(x => {
				  if (x) {
					  this.selectedMedia = x;
					  this.setPreviewImage(this.selectedMedia.azureUrl);
				  }});
		  }
      if (this.uploaderType === UploaderType.Image)
        this.acceptString = 'image/png,image/jpg,image/jpeg';
      else if (this.uploaderType === UploaderType.Video)
        this.acceptString = 'video/mp4';

		  if (this.elementId) {
			  this.btnSaveId = this.elementId + '-' + 'btn-save';
			  this.btnClearId = this.elementId + '-' + 'btn-clear';
			  this.btnPickerId = this.elementId + '-' + 'btn-picker';
			  this.inputMediaPathId = this.elementId + '-' + 'media-input';
      }
      console.log(this.uploading, this.files);
    }
	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		if (changes['selectedMedia']) {
			if (this.selectedMedia)
				this.setPreviewImage(this.selectedMedia.azureUrl);
			else {
				this.imagePreviewUrl = null;
				this.videoPreviewUrl = null;
			}
		}
	}
    uploadFile() {
        if (!this.files)
            return;
        this.uploading = true;
        this.mediaUploading.emit(true);
        this.imagePreviewUrl = '';
        this.videoPreviewUrl = '';
        this.mediaUploaded.emit(new MediaInfo());
        for (var file of this.files) {
            this.mediaService.uploadFile(file, this.uploadUrl).subscribe((response) => {
                this.processUploadResponse(response);
                this.files.splice(0);
            });
        }
    }    

    processUploadResponse(media: MediaInfo) {
		this.selectedMedia = media;
        if (media.id > 0) {
			this.setPreviewImage(this.selectedMedia.azureUrl);
	        this.setFormValue();
            this.mediaUploaded.emit(media);
        } else
            this.failAlert("An error occurred during the upload process.");      
        this.uploading = false;
        this.mediaUploading.emit(false);
	}

	clearUpload() {
		this.setPreviewImage('');
		this.mediaUploaded.emit(new MediaInfo({ mediaType: this.selectedMedia ? this.selectedMedia.mediaType: null}));
		this.selectedMedia = null;
		this.filePath = '';
		if (this.form)
			this.form.controls[this.formControlId].patchValue(null, {});
	}

  failAlert(message) {
    this.alertService.displaySuccessFailAlert(message, false);
    }

    setPreviewImage(url) {
        if (this.selectedMedia.mediaType == MediaTypes.Image)
            this.imagePreviewUrl = url;
        else if (this.selectedMedia.mediaType == MediaTypes.Video)
            this.videoPreviewUrl = url;
    }

	setFormValue() {
		if (!this.selectedMedia)
			return;

		if (this.form)
			this.form.controls[this.formControlId].patchValue(this.savePreviewUrl ? this.selectedMedia.azureUrl : this.selectedMedia.id, {});
	}

    public filesSelectHandler(fileInput: any) {
        let FileList: FileList = fileInput.target.files;

        for (let i = 0, length = FileList.length; i < length; i++) {

            if (FileList.item(i).type.indexOf('image') > -1) {
                var img = new Image();
                img.src = window.URL.createObjectURL(FileList.item(i));
                var processFile = this.processFile.bind(this);

                img.onload = function () {
                    var width = img.naturalWidth,
                        height = img.naturalHeight;

                    window.URL.revokeObjectURL(img.src);
                    processFile(FileList.item(i), i, width, height);
                };
            } else {
                this.processFile(FileList.item(i), i);
            }

        }
    }

	processFile(file: File, index = 0, width = 0, height = 0) {
		if (!this.canUploadMultipleFiles)
			this.files = [];
        if (this.fileIsValid(file, width, height)) {
            this.files.push(file);
            this.filePath = file.name;
        } else {
			      this.correctType = false;
			      this.filePath = '';
        }
    }

    fileIsValid(file: File, width = 0, height = 0): boolean{
        var isValid = true;
        var failMessage;

        stillValid: {
            switch (this.uploaderType) {
                case UploaderType.Any:
                    isValid = true;
                    break;
                case UploaderType.Image:
                    isValid = file.type.indexOf('image') > -1;
                    break;
                case UploaderType.Video:
                    isValid = file.type.indexOf('video') > -1;
                    break;
                case UploaderType.ImageAndVideo:
                    isValid = file.type.indexOf('image') > -1 || file.type.indexOf('.ideo') > -1;
                    break;
            }          

            if (!isValid) {
                this.correctType = false;
                failMessage = "Please select a valid media type.";
                break stillValid;
            } else 
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
	                this.dimensionWarning = true;
                    break stillValid;
				}
	            this.dimensionWarning = false;
            } else {
                if ((this.maxWidth > 0 && width > this.maxWidth) || (this.maxHeight > 0 && height > this.maxHeight)) {
                    isValid = false;
					failMessage = "The selected file is too large. Please uplaod a file smaller than " + this.maxWidth + "px X " + this.maxHeight + "px.";
	                this.dimensionWarning = true;
                    break stillValid;
				}
	            this.dimensionWarning = false;
            }
		}

        if (!isValid)
            this.failAlert(failMessage);

        return isValid;
    }


}


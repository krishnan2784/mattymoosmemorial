import { Component, EventEmitter, Injectable, OnInit, AfterViewInit, Input, Output } from '@angular/core';
import { MarketDataService } from "../../services/marketdataservice";
import Userclasses = require("../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import { ShareService } from "../../services/helpers/shareservice";
import { UserDataService } from "../../services/userdataservice";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import qq from 'fine-uploader';
import Mediaservice = require("../../services/mediaservice");
import { MediaInfo } from "../../models/mediainfoclasses";
import { MediaTypes, UploaderType } from "../../enums";
import MediaDataService = Mediaservice.MediaDataService;

declare var Materialize: any;
@Injectable()
@Component({
    selector: 'upload',
    template: require('./upload.component.html'),
    styles: [require('./upload.component.css')]
})
export class UploadMediaComponent implements OnInit {

    @Input() showPreview: boolean = true;
    @Input() selectedMedia: MediaInfo = null;
    @Input() uploaderType: UploaderType = UploaderType.Any;

    public files: File[] = [];
    public uploading: boolean = false;

    public imagePreviewUrl: string;
    public videoPreviewUrl: string;
    uploaderTypes: typeof UploaderType = UploaderType;
    public correctType: boolean = true;

    @Output()
    public mediaUploaded: EventEmitter<any> = new EventEmitter();

    constructor(public mediaService: MediaDataService) {
    }

    ngOnInit() {
       
        if (this.selectedMedia)
            this.setPreviewImage();
    }

    uploadFile() {
        if (!this.files)
            return;

        this.uploading = true;
        this.imagePreviewUrl = '';
        this.mediaUploaded.emit(new MediaInfo());

        for (var file of this.files) {
            if (this.fileTypeIsValid(file)) {
                this.mediaService.uploadFile(file).subscribe((response) => {
                    this.processUploadResponse(response);
                    this.files.splice(0);
                });
            }
        }
    }    

    processUploadResponse(media: MediaInfo) {
        this.uploading = false;
        media = new MediaInfo(media);
        this.selectedMedia = media;     
        if (media.id > 0) {
            this.setPreviewImage();
            this.mediaUploaded.emit(media);
        } else
            Materialize.toast("An error occurred during the upload process.", 5000, 'red');      

    }

    notValidAlert() {
        Materialize.toast("Please select a valid media type.", 5000, 'red');      
    }

    setPreviewImage() {
        if (!this.selectedMedia)
            return;

        if (this.selectedMedia.mediaType == MediaTypes.Image)
            this.imagePreviewUrl = this.selectedMedia.azureUrl;
        else if (this.selectedMedia.mediaType == MediaTypes.Video)
            this.videoPreviewUrl = this.selectedMedia.azureUrl;
    }

    public filesSelectHandler(fileInput: any) {
        let FileList: FileList = fileInput.target.files;

        for (let i = 0, length = FileList.length; i < length; i++) {
            if (this.fileTypeIsValid(FileList.item(i))) {
                this.files.push(FileList.item(i));
            } else {
                this.correctType = false;
                this.notValidAlert();
                this.files.splice(i, 1);
            }
        }
    }

    fileTypeIsValid(file: File) : boolean{
        switch (this.uploaderType) {
            case UploaderType.Any:
                return true;
            case UploaderType.Image:
                return file.type.indexOf('image') > -1;
            case UploaderType.Video:
                return file.type.indexOf('video') > -1;
            case UploaderType.ImageAndVideo:
                return file.type.indexOf('image') > -1 || file.type.indexOf('.ideo') > -1;
        }

        return false;
    }


}


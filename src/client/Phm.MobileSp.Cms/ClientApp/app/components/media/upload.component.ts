import { Component, EventEmitter, Injectable, OnInit, AfterViewInit, Input } from '@angular/core';
import { MarketDataService } from "../../services/marketdataservice";
import Userclasses = require("../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import { ShareService } from "../../services/helpers/shareservice";
import { UserDataService } from "../../services/userdataservice";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import qq from 'fine-uploader';
import Mediaservice = require("../../services/mediaservice");
import { MediaInfo } from "../../models/mediainfoclasses";
import MediaDataService = Mediaservice.MediaDataService;

@Injectable()
@Component({
    selector: 'upload',
    template: require('./upload.component.html'),
    styles: [require('./upload.component.css')]
})
export class UploadMediaComponent {

    @Input()
    showPreview: boolean = true;

    public files: File[] = [];
    public uploading: boolean = false;
    public imagePreviewUrl: string;

    public mediaUploaded: EventEmitter<any> = new EventEmitter();

    constructor(public mediaService: MediaDataService) {
    }

    uploadFile() {
        if (!this.files)
            return;
        this.uploading = true;
        for (var file of this.files) {
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
    }

    uploadVideo(file: File) {
        this.mediaService.uploadFile(file).subscribe((response) => {
            this.processUploadResponse(response);
        });
    }

    uploadImage(file:File) {
        this.mediaService.uploadImage(file).subscribe((response) => {
            this.processUploadResponse(response);
        });
    }

    processUploadResponse(media: MediaInfo) {
        this.uploading = false;
        if (media) {
            this.imagePreviewUrl = media.path + media.name;
            this.mediaUploaded.emit(media);
        }
    }

    public filesSelectHandler(fileInput: any) {
        let FileList: FileList = fileInput.target.files;

        for (let i = 0, length = FileList.length; i < length; i++) {
            this.files.push(FileList.item(i));
        }
    }
    
}
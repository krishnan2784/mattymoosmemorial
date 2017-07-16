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
import { MediaTypes } from "../../enums";
import MediaDataService = Mediaservice.MediaDataService;

declare var Materialize: any;
@Injectable()
@Component({
    selector: 'upload',
    template: require('./upload.component.html'),
    styles: [require('./upload.component.css')]
})
export class UploadMediaComponent implements OnInit {

    @Input()
    showPreview: boolean = true;
    @Input()
    selectedMedia: MediaInfo = null;

    public files: File[] = [];
    public uploading: boolean = false;

    public imagePreviewUrl: string;
    public videoPreviewUrl: string;

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
        for (var file of this.files) {
            this.mediaService.uploadFile(file).subscribe((response) => {
                this.processUploadResponse(response);
            });
        }
    }    

    processUploadResponse(media: MediaInfo) {
        this.uploading = false;
        let mediaModel = new MediaInfo(media);
        if (media) {
            this.setPreviewImage();
            this.mediaUploaded.emit(mediaModel);
        } else
            Materialize.toast("Please upload a valid media type.", 5000, 'red');

        this.selectedMedia = mediaModel;                  
    }

    setPreviewImage() {
        if (!this.selectedMedia)
            return;

        if (this.selectedMedia.mediaType == MediaTypes.Image)
            this.imagePreviewUrl = this.selectedMedia.path + this.selectedMedia.name;
        else if (this.selectedMedia.mediaType == MediaTypes.Video)
            this.videoPreviewUrl = this.selectedMedia.path + this.selectedMedia.name;
    }

    public filesSelectHandler(fileInput: any) {
        let FileList: FileList = fileInput.target.files;

        for (let i = 0, length = FileList.length; i < length; i++) {
            this.files.push(FileList.item(i));
        }
    }
    
}
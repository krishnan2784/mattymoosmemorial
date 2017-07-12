import { Component, EventEmitter, Injectable, OnInit, AfterViewInit, Input } from '@angular/core';
import { MarketDataService } from "../../services/marketdataservice";
import Userclasses = require("../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import { ShareService } from "../../services/helpers/shareservice";
import { UserDataService } from "../../services/userdataservice";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import qq from 'fine-uploader';
import Mediaservice = require("../../services/mediaservice");
import MediaDataService = Mediaservice.MediaDataService;

@Injectable()
@Component({
    selector: 'upload',
    template: require('./upload.component.html'),
    styles: [require('./upload.component.css')]
})
export class UploadMediaComponent {

    //@Input()
    //model;
    //@Input()
    //form;

    public photoForm: FormGroup;
    public videoForm: FormGroup;

    public files: any = [];
    public isSubmitted: boolean;
    public imagePreviewUrl: string;

    constructor(public mediaService: MediaDataService) {
    }

    uploadFile() {
        if (!this.files)
            return;

        this.mediaService.uploadFile(this.files).subscribe((response) => {

        });
    }

    uploadImage() {
        if (!this.files)
            return;

        this.mediaService.uploadImage(this.files[0]).subscribe((response) => {
            this.imagePreviewUrl = response.path + response.name;
        });
    }

    public filesSelectHandler(fileInput: any) {
        let FileList: FileList = fileInput.target.files;

        for (let i = 0, length = FileList.length; i < length; i++) {
            this.files.push(FileList.item(i));
        }

        //this.progressBarVisibility = true;
    }
    
}

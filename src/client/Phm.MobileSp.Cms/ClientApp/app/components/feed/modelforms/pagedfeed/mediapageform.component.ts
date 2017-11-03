import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import Pagedfeedclasses = require("../../../../models/pagedfeedclasses");
import MediaTextFeedPage = Pagedfeedclasses.MediaTextFeedPage;
import Mediainfoclasses = require("../../../../models/mediainfoclasses");
import MediaInfo = Mediainfoclasses.MediaInfo;
import {MediaDataService} from "../../../../services/mediaservice";

@Component({
    selector: 'media-page-form',
    template: require('./mediapageform.component.html')
})
export class MediaPageFormComponent implements OnInit, OnDestroy {

    @Input('form')
    public form: FormGroup;

    @Input('model')
    public model;

    @Input('index')
    public index: number;

    @Input()
    public submitted: boolean; 

    @Output()
    public uploadedMedia: EventEmitter<any> = new EventEmitter;
    @Output()
    public mediaUploading: EventEmitter<any> = new EventEmitter();

	constructor(public mediaDataService: MediaDataService){}

	ngOnInit() {
		this.getMediaInfo();
        this.addFormControls();
    }

    ngOnDestroy() {
        this.removeFormControls();
    }

	addFormControls() {
		setTimeout(() => {
			this.form.addControl('mediaInfoId', new FormControl(this.model.mediaInfoId, [<any>Validators.required]));
		}, 10);
    };

    removeFormControls() {
        this.form.removeControl('mediaInfoId');
    };

	public getMediaInfo() {
		if (this.model && this.model.mediaInfoId > 0) {
			this.mediaDataService.getMediaInfo(this.model.mediaInfoId).subscribe((result) => {
				this.model.mediaInfo = result;
			});
		}
	}

    attachMedia(media: MediaInfo) {
        this.uploadedMedia.emit(media);
    }
}
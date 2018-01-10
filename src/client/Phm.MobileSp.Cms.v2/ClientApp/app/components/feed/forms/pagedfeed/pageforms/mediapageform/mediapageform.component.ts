import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, SimpleChange, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import {MediaDataService} from "../../../../../../shared/services/mediaservice";
import {MediaInfo} from "../../../../../../models/mediainfoclasses";


@Component({
    selector: 'media-page-form',
    template: require('./mediapageform.component.html')
})
export class MediaPageFormComponent implements OnInit, OnDestroy, OnChanges {

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

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		if (changes['model']) {
			this.getMediaInfo();
		}
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
		if (this.model && this.model.mediaInfoId > 0 && (!this.model.mediaInfo || this.model.mediaInfoId !== this.model.mediaInfo.id)) {
			this.mediaDataService.getMediaInfo(this.model.mediaInfoId).subscribe((result) => {
				this.model.mediaInfo = result;
			});
		}
	}

	attachMedia(media: MediaInfo) {
		if (media && media.id > 0)
			this.uploadedMedia.emit({ media, index: this.index });
	}
}

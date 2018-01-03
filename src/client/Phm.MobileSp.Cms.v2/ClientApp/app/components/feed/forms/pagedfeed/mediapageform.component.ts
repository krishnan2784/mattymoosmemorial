import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MediaInfo } from "../../../../models/mediainfoclasses";

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

    ngOnInit() {
        this.addFormControls();
    }

    ngOnDestroy() {
        this.removeFormControls();
    }

    addFormControls() {
        this.form.addControl('mediaInfoId', new FormControl(this.model.mediaInfoId, [<any>Validators.required]));
    };

    removeFormControls() {
        this.form.removeControl('mediaInfoId');
    };

    attachMedia(media: MediaInfo) {
        this.uploadedMedia.emit(media);
    }
}

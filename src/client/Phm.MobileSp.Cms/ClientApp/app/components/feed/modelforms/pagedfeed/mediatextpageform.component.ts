import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import Pagedfeedclasses = require("../../../../models/pagedfeedclasses");
import MediaTextFeedPage = Pagedfeedclasses.MediaTextFeedPage;
import Mediainfoclasses = require("../../../../models/mediainfoclasses");
import MediaInfo = Mediainfoclasses.MediaInfo;

@Component({
    selector: 'media-text-page-form',
    template: require('./mediatextpageform.component.html')
})
export class MediaTextPageFormComponent implements OnInit {

    @Input('form')
    public form: FormGroup;

    @Input('model')
    public model: MediaTextFeedPage;

    @Input('index')
    public index: number;

    @Input()
    public submitted: boolean; 

    @Output()
    public uploadedMedia: EventEmitter<any> = new EventEmitter;

    ngOnInit() {
        this.model = new MediaTextFeedPage(this.model);
        this.addFormControls();
    }

    addFormControls() {
        this.form.addControl('bodyText', new FormControl(this.model.bodyText, [<any>Validators.required]));
        this.form.addControl('mediaInfoId', new FormControl(this.model.mediaInfoId, [<any>Validators.required]));
    };

    attachMedia(media: MediaInfo) {
        this.uploadedMedia.emit(media);
    }
}
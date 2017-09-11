import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import Pagedfeedclasses = require("../../../../models/pagedfeedclasses");
import MediaTextFeedPage = Pagedfeedclasses.MediaTextFeedPage;
import Mediainfoclasses = require("../../../../models/mediainfoclasses");
import MediaInfo = Mediainfoclasses.MediaInfo;

@Component({
    selector: 'media-text-page-form',
    template: require('./mediatextpageform.component.html'),
    styles: [require('./mediatextpageform.component.css')]
})
export class MediaTextPageFormComponent implements OnInit, OnDestroy {

    @Input('form')
    public form: FormGroup;

    @Input('model')
    public model: MediaTextFeedPage;

    @Input('index')
    public index: number;

    @Input()
    public submitted: boolean; 

    ngOnInit() {
        this.model = new MediaTextFeedPage(this.model);
        this.addFormControls();
    }

    ngOnDestroy() {
        this.removeFormControls();
    }

    addFormControls() {
        this.form.addControl('bodyText', new FormControl(this.model.bodyText, [Validators.required]));
        this.form.addControl('mediaInfoId', new FormControl(this.model.bodyText, [Validators.required]));
    };

    removeFormControls() {
        this.form.removeControl('bodyText');
        this.form.removeControl('mediaInfoId');
    };

    attachMedia(media: MediaInfo) {
        this.model.mediaInfoId = media.id;
        this.model.mediaInfo = media;
        this.form.controls.mediaInfoId.patchValue(this.model.mediaInfoId, { onlySelf: true });
        this.form.updateValueAndValidity();
    }
}
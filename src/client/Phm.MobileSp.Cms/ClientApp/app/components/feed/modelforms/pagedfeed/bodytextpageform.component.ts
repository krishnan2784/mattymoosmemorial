import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import Enums = require("../../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Pagedfeedclasses = require("../../../../models/pagedfeedclasses");
import TextFeedPage = Pagedfeedclasses.TextFeedPage;

@Component({
    selector: 'bodytext-page-form',
    template: require('./bodytextpageform.component.html'),
    styles: [require('./bodytextpageform.component.css')]
})
export class BodyTextPageFormComponent implements OnInit {

    @Input('form')
    public form: FormGroup;

    @Input('model')
    public model;

    @Input('index')
    public index: number;

    @Input()
    public submitted: boolean; 

    ngOnInit() {
        this.addFormControls();
    }
    
    addFormControls() {
        this.form.addControl('bodyText', new FormControl(this.model.bodyText, [<any>Validators.required]));
    };

}
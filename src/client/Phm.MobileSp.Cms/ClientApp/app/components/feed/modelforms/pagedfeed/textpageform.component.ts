import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import Enums = require("../../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Pagedfeedclasses = require("../../../../models/pagedfeedclasses");
import TextFeedPage = Pagedfeedclasses.TextFeedPage;

@Component({
    selector: 'text-page-form',
    template: require('./textpageform.component.html'),
    styles: [require('./textpageform.component.css')]
})
export class TextPageFormComponent implements OnInit {

    @Input('form')
    public form: FormGroup;

    @Input('model')
    public model: TextFeedPage;

    @Input('index')
    public index: number;

    @Input()
    public submitted: boolean; 

    ngOnInit() {
        this.model = new TextFeedPage(this.model);
        this.addFormControls();
    }
    
    addFormControls() {
        this.form.addControl('bodyText', new FormControl(this.model.bodyText, [<any>Validators.required]));
    };

}
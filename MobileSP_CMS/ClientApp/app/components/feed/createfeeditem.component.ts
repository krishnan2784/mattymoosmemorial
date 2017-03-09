import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { IFeedItem } from "../models/interfaces/feedinterfaces";
import Enums = require("../enums");
import Feedclasses = require("../models/feedclasses");

@Component({
    selector: 'createfeeditem',
    template: require('./createfeeditem.component.html')
})
export class CreateFeedItemFormComponent implements OnInit {
    @Input('group')

    public form: FormGroup; 
    public submitted: boolean; 
    public events: any[] = [];
    public _fb: FormBuilder;

    constructor(fb: FormBuilder) {
        this._fb = fb;
        this.initialiseForm();
    }

    ngOnInit() {};

    public  initialiseForm() {
        this.form = this._fb.group({
            title: ['', [<any>Validators.required, <any>Validators.minLength(5)]]
        });
    }

    save(model: IFeedItem, isValid: boolean) {
        this.submitted = true; 
        alert(JSON.stringify(model, null, 4));

    }
}


import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { TextFeed } from '../../models/feedclasses.ts';
import { CreateFeedItemFormComponent } from "../createfeeditem.component";

@Component({
    selector: 'textfeeditem',
    template: require('./textfeeditem.component.html')
})
export class TextFeedItemFormComponent extends CreateFeedItemFormComponent implements OnInit {
    public bodyText:string;

    constructor(_fb: FormBuilder) {
        super(_fb);
    } 

    ngOnInit() {
        this.form.addControl('bodyText', new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]));
    }
}


import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextFeed } from '../../models/feedclasses.ts';
import { FeedItemForm } from "./feeditemform.component";
import Enums = require("../../enums");

@Component({
    selector: 'textfeeditem',
    template: require('./textfeeditem.component.html')
})
export class TextFeedItemFormComponent extends FeedItemForm {


    constructor(fb: FormBuilder, http: Http, route: ActivatedRoute, router: Router) {
        super(fb, http, route, router);
        this.updateURL = '/api/Feed/UpdateTextFeedItem';
        if (this.selectedFeedItemId === 0) {
            this.model = new TextFeed();
        }
        this.selectedFeedTypeEnum = Enums.FeedTypeEnum.Text;
        this.selectedFeedType = {
            name: this.feedTypesEnum[this.selectedFeedTypeEnum],
            value: this.selectedFeedTypeEnum
        };
    } 

    addFormControls() {
        this.form.addControl('bodyText', new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]));
    };

    getModel() {
        this.http.get(this.getUrl + this.selectedFeedItemId).subscribe(result => {
            this.model = new TextFeed(result.json());
            this.updateForm();
        });
    }
}
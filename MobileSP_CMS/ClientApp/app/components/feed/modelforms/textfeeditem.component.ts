import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextFeed } from '../../models/feedclasses.ts';
import { FeedItemForm } from "./feeditemform.component";
import * as Enums from "../../enums";
import { FeedDataService }  from "../../dataservices/feeddataservice";

@Component({
    selector: 'textfeeditem',
    template: require('./textfeeditem.component.html')
})
export class TextFeedItemFormComponent extends FeedItemForm {


    constructor(fb: FormBuilder, http: Http, route: ActivatedRoute, router: Router, feedDataService: FeedDataService) {
        super(fb, http, route, router, feedDataService);
        this.updateUrl = '/api/Feed/UpdateTextFeedItem';
    } 

    addFormControls() {
        this.form.addControl('bodyText', new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]));
    };

    getDbModel() {
        this.feedDataService.getFeeditem(this.selectedFeedItemId, TextFeed).subscribe((result) => {
            this.model = result;
            this.updateForm();
        });           
    }

    getNewModel() {
        this.model = new TextFeed({});
    }
}
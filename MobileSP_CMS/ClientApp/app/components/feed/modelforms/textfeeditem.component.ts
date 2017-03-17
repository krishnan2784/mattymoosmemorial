import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextFeed } from '../../models/feedclasses.ts';
import { FeedItemForm } from "./feeditemform.component";
import * as Enums from "../../enums";

@Component({
    selector: 'textfeeditem',
    template: require('./textfeeditem.component.html')
})
export class TextFeedItemFormComponent extends FeedItemForm {


    constructor(fb: FormBuilder, http: Http, route: ActivatedRoute, router: Router) {
        super(fb, http, route, router);
        this.updateURL = '/api/Feed/UpdateTextFeedItem';
        if (this.selectedFeedItemId === 0) {
            this.model = new TextFeed({});
        }
    } 

    addFormControls() {
        this.form.addControl('bodyText', new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]));
    };

    getModel() {
        var observable = this.feedDataService.refreshFeeditems();
        observable.subscribe(() => {
            this.modelObservable = this.feedDataService.getFeeditem(this.selectedFeedItemId, TextFeed);
            this.modelObservable.subscribe((data) => {
                this.model = data;
                this.updateForm();
            });
        });

    }
}
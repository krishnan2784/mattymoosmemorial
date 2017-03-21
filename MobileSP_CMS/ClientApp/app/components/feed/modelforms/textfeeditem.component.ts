import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextFeed } from '../../../models/feedclasses.ts';
import { FeedItemForm } from "./feeditemform.component";
import * as Enums from "../../../enums";
import { FeedDataService }  from "../../../dataservices/feeddataservice";
import IFeedItemComponents = require("../../../interfaces/components/IFeedItemComponents");

@Component({
    selector: 'textfeeditem',
    template: require('./textfeeditem.component.html')
})
export class TextFeedItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {

    public feedModelType;
    public updateUrl: string = '/api/Feed/UpdateTextFeedItem';
    public feedType: Enums.FeedTypeEnum = Enums.FeedTypeEnum.Text;

    constructor() {
        this.feedModelType = TextFeed;
    } 

    addFormControls(form: FormGroup): FormGroup {
        form.addControl('bodyText', new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]));
        return form;
    };

    removeFormControls(form: FormGroup): FormGroup {
        form.removeControl('bodyText');
        return form;
    };
    
}
import { Component, Input, Injector } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedItemForm } from "./feeditemform.component";
import { FeedDataService }  from "../../../dataservices/feeddataservice";
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");

@Component({
    selector: 'textfeeditem',
    template: require('./textfeeditem.component.html')
})
export class TextFeedItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {

    public feedModelType;
    public updateUrl: string = '/api/Feed/UpdateTextFeedItem';
    public feedType: Enums.FeedTypeEnum = FeedTypeEnum.Text;

    public form: FormGroup;

    constructor(private injector: Injector) {
        if (injector) {
            this.form = injector.get('form');
        }
        this.feedModelType = Feedclasses.TextFeed;
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
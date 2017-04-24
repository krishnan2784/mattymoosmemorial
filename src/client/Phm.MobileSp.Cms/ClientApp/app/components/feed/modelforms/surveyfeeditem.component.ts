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
import Feedformstepsclasses = require("../../../models/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;

@Component({
    selector: 'surveyfeeditem',
    template: require('./surveyfeeditem.component.html')
})
export class SurveyFeedItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {

    public feedModelType;
    public updateUrl: string = '/api/Feed/UpdateSurveyFeedItem';
    public feedType: Enums.FeedTypeEnum = FeedTypeEnum.Survey;

    public form: FormGroup;
    public feedFormSteps: FeedFormSteps;

    constructor(private injector: Injector) {
        if (injector) {
            this.form = injector.get('form');
            this.feedFormSteps = injector.get('feedFormSteps');
        }
        this.feedModelType = Feedclasses.SurveyFeed;
    } 

    addFormControls(form: FormGroup): FormGroup {
        return form;
    };

    removeFormControls(form: FormGroup): FormGroup {
        return form;
    };
    
}
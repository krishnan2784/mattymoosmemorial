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
import FeedModel = require("../../../interfaces/models/IFeedModel");
import { BasePartialItemFormComponent } from "./basepartialfeeditem.component";

@Component({
    selector: 'textfeeditem',
    template: require('./textfeeditem.component.html')
})
export class TextFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {

    constructor(injector: Injector) {
        super(injector, Feedclasses.TextFeed, '/api/Feed/UpdateTextFeedItem', FeedTypeEnum.Text);
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
import { Component, Input, Injector } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedItemForm } from "./feeditemform.component";
import { FeedDataService }  from "../../../services/feeddataservice";
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
import FeedModel = require("../../../interfaces/models/IFeedModel");
import { BasePartialItemFormComponent } from "./basepartialfeeditem.component";

@Component({
    selector: 'textfeeditem',
    template: require('./textfeeditem.component.html')
})
export class TextFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.TextFeed;

    constructor(injector: Injector) {
        super(injector, Feedclasses.TextFeed, '/api/Feed/UpdateTextFeedItem', FeedTypeEnum.Text);
    } 

    addFormControls() {
        this.form.addControl('bodyText', new FormControl(this.model.bodyText, [<any>Validators.required, <any>Validators.minLength(5)]));
    };

    removeFormControls() {
        this.form.removeControl('bodyText');
    };
    
}
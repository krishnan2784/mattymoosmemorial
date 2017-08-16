import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
import FeedModel = require("../../../interfaces/models/IFeedModel");

@Component({
})
export class BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm, OnInit, OnDestroy {
    public form: FormGroup;
    public feedFormSteps: FeedFormSteps;
    public model: FeedModel.IFeedItem;
    public submitted: boolean; 
    constructor(private injector: Injector, public feedModelType, public updateUrl: string,
        public feedType: Enums.FeedTypeEnum) {
        if (injector) {
            this.form = injector.get('form');
            this.model = injector.get('model');
            this.submitted = injector.get('submitted');
            this.feedFormSteps = injector.get('feedFormSteps');
        }
    } 


    ngOnInit(): void {
        this.model = new this.feedModelType(this.model);
        this.addFormControls();
    }

    ngOnDestroy(): void {
        this.removeFormControls();
    }

    addFormControls() {
    };

    removeFormControls() {
    };
    
}
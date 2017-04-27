import { Component, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
import FeedModel = require("../../../interfaces/models/IFeedModel");

@Component({
    selector: 'textfeeditem',
    template: require('./textfeeditem.component.html')
})
export class BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    public form: FormGroup;
    public feedFormSteps: FeedFormSteps;
    public model: FeedModel.IFeedItem;

    constructor(private injector: Injector, public feedModelType, public updateUrl: string,
        public feedType: Enums.FeedTypeEnum) {
        if (injector) {
            this.form = injector.get('form');
            this.model = injector.get('model');
            this.feedFormSteps = injector.get('feedFormSteps');
        }
    } 

    addFormControls(form: FormGroup): FormGroup {
        return form;
    };

    removeFormControls(form: FormGroup): FormGroup {
        return form;
    };
    
}
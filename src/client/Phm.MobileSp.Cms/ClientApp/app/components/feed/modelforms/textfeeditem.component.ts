import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms'
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import { BasePartialItemFormComponent } from "./basepartialfeeditem.component";

@Component({
    selector: 'textfeeditem', template: ''
})
export class TextFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.TextFeed;

    constructor(injector: Injector) {
        super(injector, Feedclasses.TextFeed, FeedTypeEnum.Text);
    } 

    addFormControls() {
       this.form.controls['bodyText'].setValidators(Validators.required);
       this.form.controls['mainIconId'].setValidators(Validators.required);
    };

    removeFormControls() {
        this.form.controls['bodyText'].setValidators(null);
    };
    
}
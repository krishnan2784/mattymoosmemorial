import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms'
import {BasePartialItemFormComponent} from "../basepartialfeeditem.component";
import {IFeedItemPartialForm} from "../../../../contracts/components/IFeedItemComponents";
import {TextFeed} from "../../../../models/feedclasses";
import {FeedTypeEnum} from "../../../../../enums";


@Component({
    selector: 'textfeeditem', template: ''
})
export class TextFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemPartialForm {
    model: TextFeed;

    constructor(injector: Injector) {
        super(injector, TextFeed, FeedTypeEnum.Text);
    } 

    addFormControls() {
       this.form.controls['bodyText'].setValidators(Validators.required);
       this.form.controls['mainIconId'].setValidators(Validators.required);
    };

    removeFormControls() {
        this.form.controls['bodyText'].setValidators(null);
    };
    
}

import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChange, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
import FeedModel = require("../../../interfaces/models/IFeedModel");

@Component({
})
export class BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm, OnInit, OnDestroy {
    @Input()
    public form: FormGroup;
    @Input()
    public feedFormSteps: FeedFormSteps;
    @Input()
    public model: FeedModel.IFeedItem;
    @Input()
    public submitted: boolean; 
    constructor(private injector: Injector, public feedModelType, public feedType: Enums.FeedTypeEnum) {
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
import { Component, Injector, OnInit, OnDestroy, OnChanges, SimpleChange, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {IFeedItemPartialForm} from "../../../contracts/components/IFeedItemComponents";
import {FeedFormSteps} from "../../../classes/feedformstepsclasses";
import {IFeedItem} from "../../../contracts/models/IFeedModel";
import {FeedTypeEnum} from "../../../../enums";


@Component({
})
export class BasePartialItemFormComponent implements IFeedItemPartialForm, OnInit, OnDestroy {
    @Input()
    public form: FormGroup;
    @Input()
    public feedFormSteps: FeedFormSteps;
    @Input()
    public model: IFeedItem;
    @Input()
    public submitted: boolean; 

    @Output()
    public mediaUploading: EventEmitter<any> = new EventEmitter();

    constructor(private injector: Injector, public feedModelType, public feedType: FeedTypeEnum) {
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

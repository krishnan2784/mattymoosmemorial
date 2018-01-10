import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';import {IFeedItem} from "../models/IFeedModel";import {FeedTypeEnum} from "../../../enums";
export interface IFeedItemForm {
    _fb: FormBuilder;
    form: FormGroup;
    model: IFeedItem;
    subForm: IFeedItemPartialForm;

    initialiseForm();
    getModel();
}

export interface IFeedItemPartialForm {
    feedModelType: any;
    feedType: FeedTypeEnum;
    model: IFeedItem;

    addFormControls();
    removeFormControls();
}

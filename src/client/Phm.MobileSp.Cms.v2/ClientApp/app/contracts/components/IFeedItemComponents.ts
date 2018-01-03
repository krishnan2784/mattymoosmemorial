import { FormGroup, FormBuilder } from '@angular/forms'
import { IFeedItem } from "../models/IFeedModel";
import * as Enums from "../../../enums";

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
    feedType: Enums.FeedTypeEnum;
    model: IFeedItem;

    addFormControls();
    removeFormControls();
}

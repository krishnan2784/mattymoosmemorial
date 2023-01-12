import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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
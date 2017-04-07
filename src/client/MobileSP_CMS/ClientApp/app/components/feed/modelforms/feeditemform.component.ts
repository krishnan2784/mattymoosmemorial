import { Component, Input, Output, OnDestroy, OnInit, EventEmitter, Injector, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Rx";
import { EnumEx } from "../../../classes/enumerators";
import { FeedDataService } from "../../../dataservices/FeedDataService";
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import { TextFeedItemFormComponent } from "./textfeeditem.component";
import FeedModel = require("../../../interfaces/models/IFeedModel");
import FeedItem = FeedModel.IFeedItem;
import Enums = require("../../../enums");
import FeedCategoryEnum = Enums.FeedCategoryEnum;

@Component({
    selector: 'feeditemform',
    template: require('./feeditemform.component.html'),
    providers: [FeedDataService]
})
export class FeedItemForm implements IFeedItemComponents.IFeedItemForm {
    public _fb: FormBuilder;

    public form: FormGroup;
    public subForm: IFeedItemComponents.IFeedItemPartialForm;
    public submitted: boolean; 
    
    @Output()
    public feedUpdated: EventEmitter<any>;
    public model: FeedModel.IFeedItem;
    public modelObservable: Observable<FeedItem>;
    
    public selectedFeedCatId: number = 0;

    public feedCategories: { name: string; value: number }[] = [];

    public id_sub: Subscription;

    public textForm = TextFeedItemFormComponent;

    constructor(fb: FormBuilder, public http: Http, public route: ActivatedRoute,
        private router: Router, public feedDataService: FeedDataService, private injector: Injector) {
        
        this._fb = fb;
        this.subForm = new TextFeedItemFormComponent();

        this.setupForm();

        this.model = this.injector.get('feedItem');
        this.selectedFeedCatId = this.injector.get('feedCat');

        this.getModel();
        
        this.feedCategories = EnumEx.getNamesAndValues(FeedCategoryEnum);
    }

    public setupForm() {
        this.initialiseForm();
        this.form = this.subForm.addFormControls(this.form);
    }

    public swapForm<TFormType extends any>(newFormType: TFormType) {
        let newForm = new newFormType();
        if (this.form) {
            this.form = this.subForm.removeFormControls(this.form);
        }
        this.subForm = newForm;
        this.form = this.subForm.addFormControls(this.form);
        this.model.feedType = this.subForm.feedType;
        this.updateForm();
    }

    public initialiseForm() {
        this.form = this._fb.group({
            id: ['', []],
            title: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            feedType: ['', [<any>Validators.required]],
            feedCategory: ['', [<any>Validators.required]],
            points: ['', [<any>Validators.required]],
            enabled: ['', []],
            published: ['', []],
            marketId: ['', [<any>Validators.required]],
            mainIcon: ['', []]
        });
    }

    getModel() {
        if (this.model) {
            this.updateForm();
        } else {
            this.getNewModel();
        }
    };


    //getDbModel() {
    //    this.feedDataService.getFeeditem(this.selectedFeedItemId, this.subForm.feedModelType).subscribe((result) => {
    //        this.model = result;
    //        this.updateForm();
    //    });
    //}

    getNewModel() {
        this.model = new this.subForm.feedModelType({});
        this.model.feedCategory = this.selectedFeedCatId;
        this.updateForm();
    }

    updateForm() {
        if (this.model)
            (this.form).patchValue(this.model, { onlySelf: true });
    }

    save(feedItem: FeedItem, isValid: boolean) {
        if (!isValid)
            return;

        this.submitted = true;
        this.feedDataService.updateFeeditem(this.subForm.updateUrl, feedItem).subscribe(result => {
            if (result.success) {
                this.model = result.content;
                this.feedUpdated.emit(result.content);    
            }
        });
    }

    goBack() {
        this.feedUpdated.emit(null);    
    }
}

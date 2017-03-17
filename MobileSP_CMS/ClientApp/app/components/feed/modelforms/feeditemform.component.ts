import { Component, Input, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IFeedItem } from "../../models/interfaces/feedinterfaces";
import { Subscription } from "rxjs/Rx";
import { EnumEx } from "../../classes/enumerators";
import { FeedDataService } from "../../dataservices/FeedDataService";
import * as Feediteminterfaces from "../../interfaces/feediteminterfaces";
import * as Enums from "../../enums";

@Component({
    selector: 'feeditemform',
    template: require('./feeditemform.component.html'),
    providers: [FeedDataService]
})
export class FeedItemForm implements Feediteminterfaces.IFeedItemForm {
    
    public _fb: FormBuilder;

    @Input('group')
    public form: FormGroup;
    public submitted: boolean; 
    
    public feedUpdated: EventEmitter<any> = new EventEmitter<any>();
    public model: IFeedItem;
    public modelObservable: Observable<IFeedItem>;

    @Input('id')
    public selectedFeedItemId: number = 0;
    public selectedFeedCat: { name: string; value: number };
    public feedCategories: { name: string; value: number }[] = [];
    public updateUrl: string;
    public id_sub: Subscription;
    feedTypesEnum: typeof Enums.FeedTypeEnum = Enums.FeedTypeEnum;
    
    constructor(fb: FormBuilder, public http: Http, public route: ActivatedRoute,
        private router: Router, public feedDataService: FeedDataService) {
        
        this._fb = fb;
        this.initialiseForm();
        this.addFormControls();

        this.selectedFeedItemId = this.route.snapshot.params["id"] | 0;
        this.getModel();
        
        this.feedCategories = EnumEx.getNamesAndValues(Enums.FeedCategoryEnum);
        this.selectedFeedCat = {
            name: Enums.FeedCategoryEnum.Learning.toString(),
            value: Enums.FeedCategoryEnum.Learning.valueOf()
        };
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
        if (this.selectedFeedItemId > 0) {
            this.getDbModel();
        } else {
            this.getNewModel();
        }
    };


    updateForm() {
        if (this.model)
            (this.form).patchValue(this.model, { onlySelf: true });
    }

    save(feedItem: IFeedItem, isValid: boolean) {

        if (!isValid)
            return;

        this.submitted = true;

        this.feedDataService.updateFeeditem(this.updateUrl, feedItem).subscribe(result => {
            if (result.success) {
                this.model = result.model;
                this.feedUpdated.emit(feedItem);
                this.router.navigate(["/feed"]);            
            }
        });

    }


    addFormControls() { };
    getDbModel() { };
    getNewModel() { };
}

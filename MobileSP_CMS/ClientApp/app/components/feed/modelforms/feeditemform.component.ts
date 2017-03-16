import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IFeedItem } from "../../models/interfaces/feedinterfaces";
import Feediteminterfaces = require("../../interfaces/feediteminterfaces");
import Enums = require("../../enums");
import { Subscription } from "rxjs/Rx";
import {EnumEx} from "../../classes/enumerators";

@Component({
    selector: 'feeditemform',
    template: require('./feeditemform.component.html')
})
export class FeedItemForm implements Feediteminterfaces.IFeedItemForm {
    
    public _fb: FormBuilder;

    @Input('group')
    public form: FormGroup;
    public submitted: boolean; 

    public events: any[] = [];
    public model: IFeedItem;

    @Input('id')
    public selectedFeedItemId:number = 0;
    public selectedFeedType: { name: string; value: number };
    public selectedFeedCat: { name: string; value: number };
    private feedTypes: { name: string; value: number }[] = [];
    private feedCategories: { name: string; value: number }[] = [];
    public selectedFeedTypeEnum: Enums.FeedTypeEnum = Enums.FeedTypeEnum.Text;
    public updateURL: string;
    public deleteURL: string;
    public getUrl: string = '/api/Feed/GetFeedItem?id=';
    feedTypesEnum: typeof Enums.FeedTypeEnum = Enums.FeedTypeEnum;

    public id_sub: Subscription;

    constructor(fb: FormBuilder, public http: Http, public route: ActivatedRoute,
        private router: Router) {
        
        this.id_sub = route.queryParams.subscribe(
            (queryParam: any) => {
                this.selectedFeedItemId = queryParam['id'] || this.selectedFeedItemId;
                if (this.selectedFeedItemId > 0) {
                    this.getModel();
                }
            }
        );

        this._fb = fb;
        this.initialiseForm();
        this.addFormControls();

        this.feedTypes = EnumEx.getNamesAndValues(Enums.FeedTypeEnum);
        this.feedCategories = EnumEx.getNamesAndValues(Enums.FeedCategoryEnum);
        this.selectedFeedCat = {
            name: Enums.FeedCategoryEnum.Learning.toString(),
            value: Enums.FeedCategoryEnum.Learning.valueOf()
        };
    }


    public initialiseForm() {
        this.form = this._fb.group({
            Id: ['', []],
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

    addFormControls() { };
    getModel() {};

    updateForm() {
        (this.form)
            .patchValue(this.model, { onlySelf: true });
    }

    save(feedItem: IFeedItem, isValid: boolean) {
        this.submitted = true;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(feedItem);
        
        this.http.post(this.updateURL, body, { headers: headers }).subscribe(
            (result) => {
                alert("Success");
                this.model = result.json();
                this.updateForm();
            },
            err => { console.log(err) } 
        );
    }

}

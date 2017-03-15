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
    feedTypesEnum: typeof Enums.FeedTypeEnum = Enums.FeedTypeEnum;

    public id_sub: Subscription;

    constructor(fb: FormBuilder, private http: Http, private route: ActivatedRoute,
        private router: Router) {
        
        this.id_sub = route.queryParams.subscribe(
            (queryParam: any) => {
                this.selectedFeedItemId = queryParam['id'] || this.selectedFeedItemId;
                if (this.selectedFeedItemId > 0) {
                    http.get('/api/Feed/Get' + this.feedTypesEnum[this.selectedFeedTypeEnum] + 'FeedItem?id=' + this.selectedFeedItemId).subscribe(result => {
                        this.model = result.json();
                        this.updateForm();
                    });
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
            id: ['', []],
            title: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            feedType: ['', [<any>Validators.required]],
            feedCategory: ['', [<any>Validators.required]],
            points: ['', [<any>Validators.required]],
            enabled: ['', []],
            published: ['', []],
            marketId: ['', [<any>Validators.required]],
            createdAt: ['', []],
            deletedAt: ['', []],
            updatedAt: ['', []],
            mainIcon: ['', []],
            masterId: ['', []]
        });
    }

    addFormControls() { };

    updateForm() {
        (this.form)
            .setValue(this.model, { onlySelf: true });
    }

    save(model: IFeedItem, isValid: boolean) {
        this.submitted = true;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(model);
        let options = new RequestOptions({ headers: headers, body : body});

        alert(body);

        this.http.post('/api/Feed/Update' + this.feedTypesEnum[this.selectedFeedTypeEnum] + 'FeedItem', body, options).subscribe(
            (result) => {
                alert("Success");
                this.model = result.json();
                this.updateForm();
            },
            err => { console.log(err) } 
        );
    }

}

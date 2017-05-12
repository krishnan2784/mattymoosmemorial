import { Component, Output, EventEmitter, Injector } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Rx";
import { FeedDataService } from "../../../dataservices/FeedDataService";
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import { TextFeedItemFormComponent } from "./textfeeditem.component";
import FeedModel = require("../../../interfaces/models/IFeedModel");
import FeedItem = FeedModel.IFeedItem;
import Enums = require("../../../enums");
import FeedCategoryEnum = Enums.FeedCategoryEnum;
import Feedclasses = require("../../../models/feedclasses");
import Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
import FeedFormStepType = Feedformstepsclasses.FeedFormStepType;
import Quizfeeditemcomponent = require("./quizfeeditem.component");
import QuizFeedItemFormComponent = Quizfeeditemcomponent.QuizFeedItemFormComponent;
import Surveyfeeditemcomponent = require("./surveyfeeditem.component");
import SurveyFeedItemFormComponent = Surveyfeeditemcomponent.SurveyFeedItemFormComponent;
import Datashareservice = require("../../../dataservices/datashareservice");
import ShareService = Datashareservice.ShareService;
declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'feeditemform',
    template: require('./feeditemform.component.html'),
    styles: [require('./feeditemform.component.css')],
    providers: [FeedDataService]
})
export class FeedItemForm implements IFeedItemComponents.IFeedItemForm {
    public _fb: FormBuilder;

    public form: FormGroup;
    public subForm: IFeedItemComponents.IFeedItemPartialForm;
    feedFormData = null;
    public submitted: boolean; 
    
    @Output()
    public feedUpdated: EventEmitter<any>;
    public model: FeedModel.IFeedItem;
    public modelObservable: Observable<FeedItem>;
    
    public selectedFeedCatId: number = 0;

    feedTypes: typeof Enums.FeedTypeEnum = Enums.FeedTypeEnum;
    feedCats: typeof FeedCategoryEnum = FeedCategoryEnum;

    public id_sub: Subscription;

    public textForm = TextFeedItemFormComponent;
    public quizForm = QuizFeedItemFormComponent;
    public surveyForm = SurveyFeedItemFormComponent;

    public feedFormSteps: FeedFormSteps = new FeedFormSteps();

    constructor(fb: FormBuilder, public http: Http, public route: ActivatedRoute,
        private router: Router, public feedDataService: FeedDataService, private injector: Injector, public sharedService: ShareService) {
        
        this._fb = fb;

        this.setupForm();

        this.model = this.injector.get('feedItem');
        this.selectedFeedCatId = this.injector.get('feedCat');

        this.getModel();
    }

    public setupForm() {
        this.initialiseForm();
    }

    public swapForm<TFormType extends any>(newFormType: TFormType, feedCategory: FeedCategoryEnum) {
        let newForm = (new newFormType()) as IFeedItemComponents.IFeedItemPartialForm;

        if (this.form && this.subForm) {
            this.subForm = null;
        }

        this.feedFormData = {
            feedFormComponent: newFormType,
            inputs: { form: this.form, feedFormSteps: this.feedFormSteps, model: this.model }
        };

        this.subForm = newForm;
        this.model.feedType = this.subForm.feedType;
        this.model.feedCategory = feedCategory;
        this.feedFormSteps.setFormType(newForm.feedType);
        this.updateForm();
     
    }

    public initialiseForm() {
        this.form = this._fb.group({
            id: ['', []],
            title: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            shortDescription: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
            feedType: ['', [<any>Validators.required]],
            feedCategory: ['', [<any>Validators.required]],
            points: ['', []],
            enabled: ['', []],
            published: ['', []],
            mainIcon: ['', []],
            allowFavourite: ['', []],
            legalInformation: ['', []],
            makeTitleWidgetLink: ['', []],
            permissions: ['', []],
            readingTime: ['', []],
            startDate: ['', []],
            endDate: ['', []]
        });

        setTimeout(function(){
            $('.datepicker').pickadate({
                selectMonths: true,
                selectYears: 5,
                format: 'dddd, dd mmm, yyyy',
                formatSubmit: 'yyyy/mm/dd'
            })}, 1000);
    }

    getModel() {
        if (this.model) {
            this.swapForm(this.getFeedType(this.model.feedType), this.model.feedCategory);
        } else {
            this.model = new Feedclasses.BaseFeed();
        }
    };

    updateForm() {
        if (this.model && this.model.id > 0) {
            (this.form).patchValue(this.model, { onlySelf: true });
            setTimeout(function () {
                Materialize.updateTextFields();
            }, 10);  
        } else {
            this.form.controls['feedType'].patchValue(this.model.feedType, { onlySelf: true });
            this.form.controls['feedCategory'].patchValue(this.model.feedCategory, { onlySelf: true });
        }
    }

    getFeedType(feedType: Enums.FeedTypeEnum) : any {
        switch (feedType) {
            case Enums.FeedTypeEnum.Quiz:
                return QuizFeedItemFormComponent;
            case Enums.FeedTypeEnum.Survey:
                return SurveyFeedItemFormComponent;
            default:
                return TextFeedItemFormComponent;
        }
    }

    save(feedItem: FeedItem, isValid: boolean) {
        this.submitted = true;

        if (!isValid)
            return;

        feedItem = new this.subForm.feedModelType(feedItem);

        this.feedDataService.updateFeeditem(this.subForm.updateUrl, feedItem).subscribe(result => {
            if (result.success) {
                this.model = result.content;
                this.sharedService.updateFeedItem(result.content);
                this.feedUpdated.emit(result.content);    
            }
        });
    }

    goBack() {
        this.feedUpdated.emit(null);    
    }
}

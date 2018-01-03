import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import {FeedDataService} from "../../../shared/services/feeddataservice";
import {IFeedItemForm, IFeedItemPartialForm } from "../../../contracts/components/IFeedItemComponents";
import {IFeedItem} from "../../../contracts/models/IFeedModel";
import {FeedCategoryEnum, MediaTypes, FeedTypeEnum, UploaderType } from "../../../../enums";
import {TextFeedItemFormComponent} from "./textfeed/textfeeditem.component";
import {QuizFeedItemFormComponent} from "./questionfeed/quizfeed/quizfeeditem.component";
import {SurveyFeedItemFormComponent} from "./questionfeed/surveyfeed/surveyfeeditem.component";
import {ObservationFeedItemFormComponent} from "./questionfeed/observationfeed/observationfeeditem.component";
import {PagedFeedItemFormComponent} from "./pagedfeed/pagedfeeditem.component";
import {FeedFormSteps} from "../../../classes/feedformstepsclasses";
import {ShareService} from "../../../shared/services/helpers/shareservice";
import {MediaDataService} from "../../../shared/services/mediaservice";
import {minValue} from "../../../classes/validators";
import {BaseFeed} from "../../../models/feedclasses";
import {ImageFeedItemFormComponent} from "./imagefeed/imagefeeditem.component";
import {VideoFeedItemFormComponent} from "./videofeed/videofeeditem.component";
import {MediaInfo} from "../../../models/mediainfoclasses";
import {FormEx} from "../../../classes/helpers/form";
import {AlertService} from "../../../shared/services/helpers/alertservice";


declare var $: any;
declare var tinymce: any;

@Component({
    selector: 'feeditemform',
    template: require('./feeditemform.component.html'),
    styles: [require('./feeditemform.component.css')],
    providers: [FeedDataService]
})
export class FeedItemForm implements IFeedItemForm {
    public form: FormGroup;
    public subForm: IFeedItemPartialForm;
    feedFormData = null;
    public submitted: boolean; 
    
    @Output()
    public feedUpdated: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    public model: IFeedItem;
    
    feedTypes: typeof FeedTypeEnum = FeedTypeEnum;
    feedCats: typeof FeedCategoryEnum = FeedCategoryEnum;
    uploaderTypes: typeof UploaderType = UploaderType;
    public id_sub: Subscription;

    public textForm = TextFeedItemFormComponent;
    public quizForm = QuizFeedItemFormComponent;
    public surveyForm = SurveyFeedItemFormComponent;
    public observationForm = ObservationFeedItemFormComponent;
    public pagedForm = PagedFeedItemFormComponent;
    
    public feedFormSteps: FeedFormSteps = new FeedFormSteps();
    public navbarData = [];

    public loading: boolean;

    minDay;
    minMonth;
    minYear;

    constructor(public _fb: FormBuilder, public http: Http, public route: ActivatedRoute,
        private router: Router, public feedDataService: FeedDataService, public sharedService: ShareService,
        public mediaDataService: MediaDataService, public alertService: AlertService) {
    }

    ngOnInit() {
        this.initialiseForm();
        this.getModel();
    }

    public swapForm<TFormType extends any>(newFormType: TFormType, feedCategory: FeedCategoryEnum) {
        let newForm = (new newFormType()) as IFeedItemPartialForm;
        this.submitted = false;

        if (!this.subForm || this.subForm.feedType != newForm.feedType && (newForm.feedType != FeedTypeEnum.Text
            || (this.subForm.feedType != FeedTypeEnum.Image && this.subForm.feedType != FeedTypeEnum.Video))) {

            if (this.form) {
                this.subForm = null;
            } 
            
            this.model = new newForm.feedModelType(this.model);

            this.subForm = newForm;
            this.model.feedType = newForm.feedType;           
        }        

        this.model.feedCategory = feedCategory;

        this.feedFormSteps.setFormType(newForm.feedType);
        this.setupFormSteps();

        this.updateForm();
    }

    public setupFormSteps() {
        this.navbarData = [];
        this.feedFormSteps.visibleSteps.forEach((step) => {
            this.navbarData.push({
                id: step.type,
                text: step.name,
                additionalText: step.additionalText
            });
        });
        this.navbarData[this.feedFormSteps.currentStepIndex()].selected = true;

    }

    public initialiseForm() {
        this.form = this._fb.group({
            id: ['', []],
            title: ['', [<any>Validators.required, <any>Validators.maxLength(160)]],
            shortDescription: ['', [<any>Validators.required, <any>Validators.maxLength(120)]],
            feedType: ['', [<any>Validators.required]],
            feedCategory: ['', [<any>Validators.required]],
            points: ['', [<any>Validators.required, minValue(1)]],
            enabled: ['', []],
            published: ['', []],
            allowFavourite: ['', []],
            legalInformation: ['', []],
            makeTitleWidgetLink: ['', []],
            permissions: ['', []],
            readingTime: ['', [<any>Validators.required, minValue(1)]],
            callToActionText: ['', []],
            callToActionUrl: ['', []],
            createdAt: ['', []],
            updatedAt: ['', []],
            startDate: ['', [<any>Validators.required]],
            endDate: ['', [<any>Validators.required]],
            mainIconId: ['', [<any>Validators.required]],
            bodyText: ['', []],
            tagText: ['', [<any>Validators.required]]
        });
    } 

    getModel() {
        if (this.model) {
            let baseModel = new BaseFeed();
            baseModel.formatFeedItemDates(this.model);
            this.getIconModel();
            this.swapForm(this.getFeedType(this.model.feedType), this.model.feedCategory);
        } else {
            this.model = new BaseFeed();
            this.updateForm();
            this.setupFormSteps();
        }
    };

    public getIconModel() {
        if (this.model && this.model.mainIconId > 0) {
            this.mediaDataService.getMediaInfo(this.model.mainIconId).subscribe((result) => {
                this.model.mainIcon = result;
            });
        }
    }

    updateForm() {
        if (this.model && this.model.id > 0) {
            (this.form).patchValue(this.model, { onlySelf: true });
            this.setMinDate(new Date(this.model.startDate));
        } else {
            this.setMinDate(new Date()); 
            this.form.controls['feedType'].patchValue(this.model.feedType, { onlySelf: true });
            this.form.controls['feedCategory'].patchValue(this.model.feedCategory, { onlySelf: true });
            this.form.controls['startDate'].patchValue(this.model.startDate, { onlySelf: true });
            this.form.controls['endDate'].patchValue(this.model.endDate, { onlySelf: true });
            this.form.controls['mainIconId'].patchValue(this.model.mainIconId, { onlySelf: true });
        }
        this.form.updateValueAndValidity();
    }

    getFeedType(feedType: FeedTypeEnum) : any {
        switch (feedType) {
            case FeedTypeEnum.Quiz:
                return QuizFeedItemFormComponent;
            case FeedTypeEnum.Survey:
                return SurveyFeedItemFormComponent;
            case FeedTypeEnum.Observation:
                return ObservationFeedItemFormComponent;
            case FeedTypeEnum.Image:
                return ImageFeedItemFormComponent;
            case FeedTypeEnum.Video:
                return VideoFeedItemFormComponent;
            default:
                return TextFeedItemFormComponent;
        }
    }

    attachMedia(media: MediaInfo, fieldName: string ='') {

        if (fieldName == null || fieldName == '') {
            if (media.mediaType == MediaTypes.Image)
                fieldName = "mainImage";
            else if (media.mediaType == MediaTypes.Video)
                fieldName = "mainVideo";
            else
                return;
        }

        var fieldIdName = fieldName + "Id";

        let model = this.model;

        model[fieldIdName] = media.id;
        model[fieldName] = media;
        
        this.model = model;

        if (fieldName == "mainImage") {
            this.swapForm(ImageFeedItemFormComponent, this.model.feedCategory);
        } else if (fieldName == "mainVideo") {
            this.swapForm(VideoFeedItemFormComponent, this.model.feedCategory);
        } 
        
        if (this.form.controls[fieldIdName] != null)
            this.form.controls[fieldIdName].patchValue(this.model[fieldIdName], { onlySelf: true });
        this.form.updateValueAndValidity();
    }

    save(feedItem: IFeedItem, isValid: boolean) {
        this.submitted = true;
        this.form.updateValueAndValidity();

        if (this.loading)
            return;

        if (!this.form.valid) {
            console.log(FormEx.getFormValidationErrors(this.form));
            return this.alertService.displaySuccessFailAlert('Please check that you have filled in all the required fields.', false);
        }
        this.loading = true;

        feedItem = new this.subForm.feedModelType(feedItem);
        feedItem.callToActionUrl = feedItem.callToActionUrl.length == 0 || feedItem.callToActionUrl.indexOf('http') == 0 ? feedItem.callToActionUrl : 'http://' + feedItem.callToActionUrl;

        this.feedDataService.updateFeeditem('', feedItem).subscribe(result => {
            if (result.success) {
                this.model = result.content;
                this.sharedService.updateFeedItem(result.content);
                this.feedUpdated.emit(result.content);
            } else 
                this.loading = false;
        });
    }

    handleStartDate(e) {
        this.minDay = e.day;
        this.minMonth = e.month;
        this.minYear = e.year;
        this.model.startDate = e.serverAcceptedDate;
        this.form.controls['startDate'].setValue(e.serverAcceptedDate);
        if (new Date(this.model.endDate) < e.fullDate) {
            this.handleEndDate(e);
        }
        this.form.markAsDirty();
    }

    handleEndDate(e) {
        this.model.endDate = e.fullDate;
        this.form.controls['endDate'].setValue(e.fullDate);
        this.form.markAsDirty();
    }

    setMinDate(date) {
        var now = new Date();
        if (new Date(date) < now)
            date = now;

        this.minDay = date.getDate();
        this.minMonth = date.getMonth();
        this.minYear = date.getFullYear();
    }

    goBack() {
        this.feedUpdated.emit(null);    
    }
}

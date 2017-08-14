import { Component, Output, EventEmitter, Injector } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Rx";
import { FeedDataService } from "../../../services/feedDataService";
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
import Datashareservice = require("../../../services/helpers/shareservice");
import ShareService = Datashareservice.ShareService;
import Observationfeeditemcomponent = require("./observationfeeditem.component");
import { MediaInfo } from "../../../models/mediainfoclasses";
import { MediaTypes } from "../../../enums";
import { ImageFeedItemFormComponent } from "./imagefeeditem.component";
import { VideoFeedItemFormComponent } from "./videofeeditem.component";
import { DateEx } from "../../../classes/helpers/date";
import { isNumber } from "util";
import ObservationFeedItemFormComponent = Observationfeeditemcomponent.ObservationFeedItemFormComponent;
import BaseFeed = Feedclasses.BaseFeed;
declare var $: any;
declare var Materialize: any;
declare var tinymce: any;

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
    uploaderTypes: typeof Enums.UploaderType = Enums.UploaderType;
    public id_sub: Subscription;

    public textForm = TextFeedItemFormComponent;
    public quizForm = QuizFeedItemFormComponent;
    public surveyForm = SurveyFeedItemFormComponent;
    public observationForm = ObservationFeedItemFormComponent;

    public feedFormSteps: FeedFormSteps = new FeedFormSteps();
    public navbarData = [];

    minDay;
    minMonth;
    minYear;

    constructor(fb: FormBuilder, public http: Http, public route: ActivatedRoute,
        private router: Router, public feedDataService: FeedDataService, private injector: Injector, public sharedService: ShareService) {
        
        this._fb = fb;

        this.initialiseForm();

        this.model = this.injector.get('feedItem');
        this.selectedFeedCatId = this.injector.get('feedCat');

        this.getModel();
    }

    public swapForm<TFormType extends any>(newFormType: TFormType, feedCategory: FeedCategoryEnum) {
        let newForm = (new newFormType()) as IFeedItemComponents.IFeedItemPartialForm;

        if (!this.subForm || this.subForm.feedType != newForm.feedType && (newForm.feedType != Enums.FeedTypeEnum.Text
            || (this.subForm.feedType != Enums.FeedTypeEnum.Image && this.subForm.feedType != Enums.FeedTypeEnum.Video))) {
            if (this.form) {
                this.subForm = null;
            } 

            this.model = new newForm.feedModelType(this.model);

            this.feedFormData = {
                feedFormComponent: newFormType,
                inputs: { form: this.form, feedFormSteps: this.feedFormSteps, model: this.model }
            };

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
            callToActionText: ['', []],
            callToActionUrl: ['', []],
            createdAt: ['', []],
            updatedAt: ['', []],
            startDate: ['', [<any>Validators.required]],
            endDate: ['', [<any>Validators.required]]
        });
    } 

    getModel() {
        if (this.model) {
            let baseModel = new Feedclasses.BaseFeed();
            baseModel.formatFeedItemDates(this.model);
            this.swapForm(this.getFeedType(this.model.feedType), this.model.feedCategory);
        } else {
            this.model = new Feedclasses.BaseFeed();
            this.updateForm();
            this.setupFormSteps();
        }
        this.model.webUrlLink.indexOf('http://')
    };

    updateForm() {
        if (this.model && this.model.id > 0) {
            (this.form).patchValue(this.model, { onlySelf: true });
            this.setMinDate(new Date(this.model.startDate));
            setTimeout(() => {
                Materialize.updateTextFields();
            }, 10);  
        } else {
            this.form.controls['feedType'].patchValue(this.model.feedType, { onlySelf: true });
            this.form.controls['feedCategory'].patchValue(this.model.feedCategory, { onlySelf: true });
            this.form.controls['startDate'].patchValue(this.model.startDate, { onlySelf: true });
            this.form.controls['endDate'].patchValue(this.model.endDate, { onlySelf: true });
        }
        this.form.updateValueAndValidity();
    }

    getFeedType(feedType: Enums.FeedTypeEnum) : any {
        switch (feedType) {
            case Enums.FeedTypeEnum.Quiz:
                return QuizFeedItemFormComponent;
            case Enums.FeedTypeEnum.Survey:
                return SurveyFeedItemFormComponent;
            case Enums.FeedTypeEnum.Observation:
                return ObservationFeedItemFormComponent;
            case Enums.FeedTypeEnum.Image:
                return ImageFeedItemFormComponent;
            case Enums.FeedTypeEnum.Video:
                return VideoFeedItemFormComponent;
            default:
                return TextFeedItemFormComponent;
        }
    }

    attachMedia(media: MediaInfo) {
        this.form.markAsDirty();
        if (media.mediaType == MediaTypes.Image) {
            let model = new Feedclasses.ImageFeed(this.model);
            model.mainImageId = media.id;
            model.mainImage = media;
            this.model = model;
            this.swapForm(ImageFeedItemFormComponent, this.model.feedCategory)
        } else if (media.mediaType == MediaTypes.Video) {
            let model = new Feedclasses.VideoFeed(this.model);
            model.mainVideoId = media.id;
            model.mainVideo = media;
            this.model = model;
            this.swapForm(VideoFeedItemFormComponent, this.model.feedCategory);
        }
    }

    save(feedItem: FeedItem, isValid: boolean) {
        
        this.submitted = true;
        
        if (!isValid)
            return;

        feedItem = new this.subForm.feedModelType(feedItem);
        feedItem.callToActionUrl = feedItem.callToActionUrl.indexOf('http') == 0 ? feedItem.callToActionUrl : 'http://' + feedItem.callToActionUrl;

        this.feedDataService.updateFeeditem(this.subForm.updateUrl, feedItem).subscribe(result => {
            if (result.success) {
                this.model = result.content;
                this.sharedService.updateFeedItem(result.content);
                this.feedUpdated.emit(result.content);
            }
        });
    }

    public updateMaterialize() {
        setTimeout(function () {
            $('#bodyText').trigger('autoresize');

            //Materialize.updateTextFields();
            //$('.datepicker').pickadate({
            //    selectMonths: true,
            //    selectYears: 5,
            //    format: 'dddd, dd mmm, yyyy',
            //    formatSubmit: 'yyyy/mm/dd'
            //});
        }, 1);
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
        this.minDay = date.getDate();
        this.minMonth = date.getMonth();
        this.minYear = date.getFullYear();
    }

    goBack() {
        this.feedUpdated.emit(null);    
    }
}

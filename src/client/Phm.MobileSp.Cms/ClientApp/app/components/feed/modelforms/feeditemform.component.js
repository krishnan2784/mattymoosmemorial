"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var feedDataService_1 = require("../../../services/feedDataService");
var textfeeditem_component_1 = require("./textfeeditem.component");
var Enums = require("../../../enums");
var FeedCategoryEnum = Enums.FeedCategoryEnum;
var Feedclasses = require("../../../models/feedclasses");
var Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
var FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
var Quizfeeditemcomponent = require("./quizfeeditem.component");
var QuizFeedItemFormComponent = Quizfeeditemcomponent.QuizFeedItemFormComponent;
var Surveyfeeditemcomponent = require("./surveyfeeditem.component");
var SurveyFeedItemFormComponent = Surveyfeeditemcomponent.SurveyFeedItemFormComponent;
var Datashareservice = require("../../../services/helpers/shareservice");
var ShareService = Datashareservice.ShareService;
var Observationfeeditemcomponent = require("./observationfeeditem.component");
var enums_1 = require("../../../enums");
var imagefeeditem_component_1 = require("./imagefeeditem.component");
var videofeeditem_component_1 = require("./videofeeditem.component");
var ObservationFeedItemFormComponent = Observationfeeditemcomponent.ObservationFeedItemFormComponent;
var FeedItemForm = (function () {
    function FeedItemForm(fb, http, route, router, feedDataService, injector, sharedService) {
        this.http = http;
        this.route = route;
        this.router = router;
        this.feedDataService = feedDataService;
        this.injector = injector;
        this.sharedService = sharedService;
        this.feedFormData = null;
        this.selectedFeedCatId = 0;
        this.feedTypes = Enums.FeedTypeEnum;
        this.feedCats = FeedCategoryEnum;
        this.textForm = textfeeditem_component_1.TextFeedItemFormComponent;
        this.quizForm = QuizFeedItemFormComponent;
        this.surveyForm = SurveyFeedItemFormComponent;
        this.observationForm = ObservationFeedItemFormComponent;
        this.feedFormSteps = new FeedFormSteps();
        this.navbarData = [];
        this._fb = fb;
        this.initialiseForm();
        this.model = this.injector.get('feedItem');
        this.selectedFeedCatId = this.injector.get('feedCat');
        this.getModel();
    }
    FeedItemForm.prototype.swapForm = function (newFormType, feedCategory) {
        var newForm = (new newFormType());
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
    };
    FeedItemForm.prototype.setupFormSteps = function () {
        var _this = this;
        this.navbarData = [];
        this.feedFormSteps.visibleSteps.forEach(function (step) {
            _this.navbarData.push({
                id: step.type,
                text: step.name,
                additionalText: step.additionalText
            });
        });
        this.navbarData[this.feedFormSteps.currentStepIndex()].selected = true;
    };
    FeedItemForm.prototype.initialiseForm = function () {
        this.form = this._fb.group({
            id: ['', []],
            title: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            shortDescription: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]],
            feedType: ['', [forms_1.Validators.required]],
            feedCategory: ['', [forms_1.Validators.required]],
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
            startDate: ['', [forms_1.Validators.required]],
            endDate: ['', [forms_1.Validators.required]]
        });
    };
    FeedItemForm.prototype.getModel = function () {
        if (this.model) {
            var baseModel = new Feedclasses.BaseFeed();
            baseModel.formatFeedItemDates(this.model);
            this.swapForm(this.getFeedType(this.model.feedType), this.model.feedCategory);
        }
        else {
            this.model = new Feedclasses.BaseFeed();
            this.updateForm();
            this.setupFormSteps();
        }
        this.model.webUrlLink.indexOf('http://');
    };
    ;
    FeedItemForm.prototype.updateForm = function () {
        if (this.model && this.model.id > 0) {
            (this.form).patchValue(this.model, { onlySelf: true });
            this.setMinDate(new Date(this.model.startDate));
            setTimeout(function () {
                Materialize.updateTextFields();
            }, 10);
        }
        else {
            this.form.controls['feedType'].patchValue(this.model.feedType, { onlySelf: true });
            this.form.controls['feedCategory'].patchValue(this.model.feedCategory, { onlySelf: true });
            this.form.controls['startDate'].patchValue(this.model.startDate, { onlySelf: true });
            this.form.controls['endDate'].patchValue(this.model.endDate, { onlySelf: true });
        }
        this.form.updateValueAndValidity();
    };
    FeedItemForm.prototype.getFeedType = function (feedType) {
        switch (feedType) {
            case Enums.FeedTypeEnum.Quiz:
                return QuizFeedItemFormComponent;
            case Enums.FeedTypeEnum.Survey:
                return SurveyFeedItemFormComponent;
            case Enums.FeedTypeEnum.Observation:
                return ObservationFeedItemFormComponent;
            case Enums.FeedTypeEnum.Image:
                return imagefeeditem_component_1.ImageFeedItemFormComponent;
            case Enums.FeedTypeEnum.Video:
                return videofeeditem_component_1.VideoFeedItemFormComponent;
            default:
                return textfeeditem_component_1.TextFeedItemFormComponent;
        }
    };
    FeedItemForm.prototype.attachMedia = function (media) {
        if (media.mediaType == enums_1.MediaTypes.Image) {
            var model = new Feedclasses.ImageFeed(this.model);
            model.mainImageId = media.id;
            this.model = model;
            this.swapForm(imagefeeditem_component_1.ImageFeedItemFormComponent, this.model.feedCategory);
        }
        else if (media.mediaType == enums_1.MediaTypes.Video) {
            var model = new Feedclasses.VideoFeed(this.model);
            model.mainVideoId = media.id;
            this.model = model;
            this.swapForm(videofeeditem_component_1.VideoFeedItemFormComponent, this.model.feedCategory);
        }
    };
    FeedItemForm.prototype.save = function (feedItem, isValid) {
        var _this = this;
        this.submitted = true;
        if (!isValid)
            return;
        feedItem = new this.subForm.feedModelType(feedItem);
        this.feedDataService.updateFeeditem(this.subForm.updateUrl, feedItem).subscribe(function (result) {
            if (result.success) {
                _this.model = result.content;
                _this.sharedService.updateFeedItem(result.content);
                _this.feedUpdated.emit(result.content);
            }
        });
    };
    FeedItemForm.prototype.updateMaterialize = function () {
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
    };
    FeedItemForm.prototype.handleDate = function (e, startDate) {
        console.log(e);
        if (startDate) {
            this.minDay = e.day;
            this.minMonth = e.month;
            this.minYear = e.year;
            this.model.startDate = e.fullDate;
            this.form.controls['startDate'].patchValue(this.model.startDate, { onlySelf: true });
        }
        else {
            this.model.endDate = e.fullDate;
            this.form.controls['endDate'].patchValue(this.model.endDate, { onlySelf: true });
        }
    };
    FeedItemForm.prototype.setMinDate = function (date) {
        console.log(date);
        this.minDay = date.getDate();
        this.minMonth = date.getMonth();
        this.minYear = date.getYear();
    };
    FeedItemForm.prototype.goBack = function () {
        this.feedUpdated.emit(null);
    };
    return FeedItemForm;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FeedItemForm.prototype, "feedUpdated", void 0);
FeedItemForm = __decorate([
    core_1.Component({
        selector: 'feeditemform',
        template: require('./feeditemform.component.html'),
        styles: [require('./feeditemform.component.css')],
        providers: [feedDataService_1.FeedDataService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, http_1.Http, router_1.ActivatedRoute,
        router_1.Router, feedDataService_1.FeedDataService, core_1.Injector, ShareService])
], FeedItemForm);
exports.FeedItemForm = FeedItemForm;
//# sourceMappingURL=feeditemform.component.js.map
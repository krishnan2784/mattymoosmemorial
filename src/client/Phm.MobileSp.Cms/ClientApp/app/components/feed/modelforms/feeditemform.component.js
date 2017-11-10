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
var feeddataservice_1 = require("../../../services/feeddataservice");
var textfeeditem_component_1 = require("./textfeeditem.component");
var FeedModel = require("../../../interfaces/models/IFeedModel");
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
var mediaservice_1 = require("../../../services/mediaservice");
var ObservationFeedItemFormComponent = Observationfeeditemcomponent.ObservationFeedItemFormComponent;
var validators_1 = require("../../../classes/validators");
var Form = require("../../../classes/helpers/form");
var FormEx = Form.FormEx;
var Pagedfeeditemcomponent = require("./pagedfeed/pagedfeeditem.component");
var PagedFeedItemFormComponent = Pagedfeeditemcomponent.PagedFeedItemFormComponent;
var FeedItemForm = (function () {
    function FeedItemForm(_fb, http, route, router, feedDataService, sharedService, mediaDataService) {
        this._fb = _fb;
        this.http = http;
        this.route = route;
        this.router = router;
        this.feedDataService = feedDataService;
        this.sharedService = sharedService;
        this.mediaDataService = mediaDataService;
        this.feedFormData = null;
        this.feedUpdated = new core_1.EventEmitter();
        this.feedTypes = Enums.FeedTypeEnum;
        this.feedCats = FeedCategoryEnum;
        this.uploaderTypes = Enums.UploaderType;
        this.textForm = textfeeditem_component_1.TextFeedItemFormComponent;
        this.quizForm = QuizFeedItemFormComponent;
        this.surveyForm = SurveyFeedItemFormComponent;
        this.observationForm = ObservationFeedItemFormComponent;
        this.pagedForm = PagedFeedItemFormComponent;
        this.feedFormSteps = new FeedFormSteps();
        this.navbarData = [];
    }
    FeedItemForm.prototype.ngOnInit = function () {
        this.initialiseForm();
        this.getModel();
        console.log(this.model);
    };
    FeedItemForm.prototype.swapForm = function (newFormType, feedCategory) {
        var newForm = (new newFormType());
        this.submitted = false;
        if (!this.subForm || this.subForm.feedType != newForm.feedType && (newForm.feedType != Enums.FeedTypeEnum.Text
            || (this.subForm.feedType != Enums.FeedTypeEnum.Image && this.subForm.feedType != Enums.FeedTypeEnum.Video))) {
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
            title: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(160)]],
            shortDescription: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(120)]],
            feedType: ['', [forms_1.Validators.required]],
            feedCategory: ['', [forms_1.Validators.required]],
            points: ['', [forms_1.Validators.required, validators_1.minValue(1)]],
            enabled: ['', []],
            published: ['', []],
            allowFavourite: ['', []],
            legalInformation: ['', []],
            makeTitleWidgetLink: ['', []],
            permissions: ['', []],
            readingTime: ['', [forms_1.Validators.required, validators_1.minValue(1)]],
            callToActionText: ['', []],
            callToActionUrl: ['', []],
            createdAt: ['', []],
            updatedAt: ['', []],
            startDate: ['', [forms_1.Validators.required]],
            endDate: ['', [forms_1.Validators.required]],
            mainIconId: ['', [forms_1.Validators.required]],
            bodyText: ['', []],
            tagText: ['', [forms_1.Validators.required]]
        });
    };
    FeedItemForm.prototype.getModel = function () {
        if (this.model) {
            var baseModel = new Feedclasses.BaseFeed();
            baseModel.formatFeedItemDates(this.model);
            this.getIconModel();
            this.swapForm(this.getFeedType(this.model.feedType), this.model.feedCategory);
        }
        else {
            this.model = new Feedclasses.BaseFeed();
            this.updateForm();
            this.setupFormSteps();
        }
    };
    ;
    FeedItemForm.prototype.getIconModel = function () {
        var _this = this;
        if (this.model && this.model.mainIconId > 0) {
            this.mediaDataService.getMediaInfo(this.model.mainIconId).subscribe(function (result) {
                _this.model.mainIcon = result;
            });
        }
    };
    FeedItemForm.prototype.updateForm = function () {
        if (this.model && this.model.id > 0) {
            (this.form).patchValue(this.model, { onlySelf: true });
            this.setMinDate(new Date(this.model.startDate));
            setTimeout(function () {
                Materialize.updateTextFields();
            }, 10);
        }
        else {
            this.setMinDate(new Date());
            this.form.controls['feedType'].patchValue(this.model.feedType, { onlySelf: true });
            this.form.controls['feedCategory'].patchValue(this.model.feedCategory, { onlySelf: true });
            this.form.controls['startDate'].patchValue(this.model.startDate, { onlySelf: true });
            this.form.controls['endDate'].patchValue(this.model.endDate, { onlySelf: true });
            this.form.controls['mainIconId'].patchValue(this.model.mainIconId, { onlySelf: true });
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
            case Enums.FeedTypeEnum.Paged:
                return PagedFeedItemFormComponent;
            default:
                return textfeeditem_component_1.TextFeedItemFormComponent;
        }
    };
    FeedItemForm.prototype.attachMedia = function (media, fieldName) {
        if (fieldName === void 0) { fieldName = ''; }
        if (fieldName == null || fieldName == '') {
            if (media.mediaType == enums_1.MediaTypes.Image)
                fieldName = "mainImage";
            else if (media.mediaType == enums_1.MediaTypes.Video)
                fieldName = "mainVideo";
            else
                return;
        }
        var fieldIdName = fieldName + "Id";
        var model = this.model;
        model[fieldIdName] = media.id;
        model[fieldName] = media;
        this.model = model;
        if (fieldName == "mainImage") {
            this.swapForm(imagefeeditem_component_1.ImageFeedItemFormComponent, this.model.feedCategory);
        }
        else if (fieldName == "mainVideo") {
            this.swapForm(videofeeditem_component_1.VideoFeedItemFormComponent, this.model.feedCategory);
        }
        if (this.form.controls[fieldIdName] != null)
            this.form.controls[fieldIdName].patchValue(this.model[fieldIdName], { onlySelf: true });
        this.form.updateValueAndValidity();
    };
    FeedItemForm.prototype.save = function (feedItem, isValid) {
        var _this = this;
        this.submitted = true;
        this.form.updateValueAndValidity();
        if (this.loading)
            return;
        console.log(this.model);
        if (!this.form.valid) {
            console.log(FormEx.getFormValidationErrors(this.form));
            $('.toast').remove();
            return Materialize.toast('Please check that you have filled in all the required fields.', 6000, 'red');
        }
        this.loading = true;
        feedItem = new this.subForm.feedModelType(feedItem);
        feedItem.callToActionUrl = feedItem.callToActionUrl.length == 0 || feedItem.callToActionUrl.indexOf('http') == 0 ? feedItem.callToActionUrl : 'http://' + feedItem.callToActionUrl;
        this.feedDataService.updateFeeditem('', feedItem).subscribe(function (result) {
            if (result.success) {
                _this.model = result.content;
                _this.sharedService.updateFeedItem(result.content);
                _this.feedUpdated.emit(result.content);
            }
            else
                _this.loading = false;
        });
    };
    FeedItemForm.prototype.handleStartDate = function (e) {
        this.minDay = e.day;
        this.minMonth = e.month;
        this.minYear = e.year;
        this.model.startDate = e.serverAcceptedDate;
        this.form.controls['startDate'].setValue(e.serverAcceptedDate);
        if (new Date(this.model.endDate) < e.fullDate) {
            this.handleEndDate(e);
        }
        this.form.markAsDirty();
    };
    FeedItemForm.prototype.handleEndDate = function (e) {
        this.model.endDate = e.fullDate;
        this.form.controls['endDate'].setValue(e.fullDate);
        this.form.markAsDirty();
    };
    FeedItemForm.prototype.setMinDate = function (date) {
        var now = new Date();
        if (new Date(date) < now)
            date = now;
        this.minDay = date.getDate();
        this.minMonth = date.getMonth();
        this.minYear = date.getFullYear();
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FeedItemForm.prototype, "model", void 0);
FeedItemForm = __decorate([
    core_1.Component({
        selector: 'feeditemform',
        template: require('./feeditemform.component.html'),
        styles: [require('./feeditemform.component.css')],
        providers: [feeddataservice_1.FeedDataService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, http_1.Http, router_1.ActivatedRoute,
        router_1.Router, feeddataservice_1.FeedDataService, ShareService,
        mediaservice_1.MediaDataService])
], FeedItemForm);
exports.FeedItemForm = FeedItemForm;
//# sourceMappingURL=feeditemform.component.js.map
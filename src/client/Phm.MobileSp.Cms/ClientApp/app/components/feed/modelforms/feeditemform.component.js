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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var FeedDataService_1 = require("../../../dataservices/FeedDataService");
var textfeeditem_component_1 = require("./textfeeditem.component");
var Enums = require("../../../enums");
var FeedCategoryEnum = Enums.FeedCategoryEnum;
var Feedclasses = require("../../../models/feedclasses");
var FeedItemForm = (function () {
    function FeedItemForm(fb, http, route, router, feedDataService, injector) {
        this.http = http;
        this.route = route;
        this.router = router;
        this.feedDataService = feedDataService;
        this.injector = injector;
        this.feedFormData = null;
        this.selectedFeedCatId = 0;
        this.feedTypes = Enums.FeedTypeEnum;
        this.feedCats = FeedCategoryEnum;
        this.textForm = textfeeditem_component_1.TextFeedItemFormComponent;
        this._fb = fb;
        this.setupForm();
        this.model = this.injector.get('feedItem');
        this.selectedFeedCatId = this.injector.get('feedCat');
        this.getModel();
    }
    FeedItemForm.prototype.setupForm = function () {
        this.initialiseForm();
    };
    FeedItemForm.prototype.swapForm = function (newFormType, feedCategory) {
        var newForm = new newFormType();
        if (this.form && this.subForm) {
            this.form = this.subForm.removeFormControls(this.form);
        }
        this.feedFormData = {
            feedFormComponent: newFormType,
            inputs: { form: this.form }
        };
        this.subForm = newForm;
        this.form = this.subForm.addFormControls(this.form);
        this.model.feedType = this.subForm.feedType;
        this.model.feedCategory = feedCategory;
        this.updateForm();
    };
    FeedItemForm.prototype.initialiseForm = function () {
        this.form = this._fb.group({
            id: ['', []],
            title: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            feedType: ['', [forms_1.Validators.required]],
            feedCategory: ['', [forms_1.Validators.required]],
            points: ['', [forms_1.Validators.required]],
            enabled: ['', []],
            published: ['', []],
            mainIcon: ['', []]
        });
    };
    FeedItemForm.prototype.getModel = function () {
        if (this.model) {
            this.swapForm(this.getFeedType(this.model.feedType), this.model.feedCategory);
        }
        else {
            this.model = new Feedclasses.BaseFeed();
        }
    };
    ;
    FeedItemForm.prototype.updateForm = function () {
        if (this.model)
            (this.form).patchValue(this.model, { onlySelf: true });
    };
    FeedItemForm.prototype.getFeedType = function (feedType) {
        switch (feedType) {
            case Enums.FeedTypeEnum.Text:
                return textfeeditem_component_1.TextFeedItemFormComponent;
            default:
        }
    };
    FeedItemForm.prototype.save = function (feedItem, isValid) {
        var _this = this;
        if (!isValid)
            return;
        this.submitted = true;
        this.feedDataService.updateFeeditem(this.subForm.updateUrl, feedItem).subscribe(function (result) {
            if (result.success) {
                _this.model = result.content;
                _this.feedUpdated.emit(result.content);
            }
        });
    };
    FeedItemForm.prototype.goBack = function () {
        this.feedUpdated.emit(null);
    };
    return FeedItemForm;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object)
], FeedItemForm.prototype, "feedUpdated", void 0);
FeedItemForm = __decorate([
    core_1.Component({
        selector: 'feeditemform',
        template: require('./feeditemform.component.html'),
        styles: [require('./feeditemform.component.css')],
        providers: [FeedDataService_1.FeedDataService]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object, typeof (_c = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _c || Object, typeof (_d = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _d || Object, typeof (_e = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _e || Object, FeedDataService_1.FeedDataService, typeof (_f = typeof core_1.Injector !== "undefined" && core_1.Injector) === "function" && _f || Object])
], FeedItemForm);
exports.FeedItemForm = FeedItemForm;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=feeditemform.component.js.map
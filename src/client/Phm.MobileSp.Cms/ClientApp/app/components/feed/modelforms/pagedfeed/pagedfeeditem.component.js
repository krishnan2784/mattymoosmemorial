"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var forms_1 = require("@angular/forms");
var Enums = require("../../../../enums");
var Basepartialfeeditemcomponent = require("../basepartialfeeditem.component");
var BasePartialItemFormComponent = Basepartialfeeditemcomponent.BasePartialItemFormComponent;
var FeedTypeEnum = Enums.FeedTypeEnum;
var Feedclasses = require("../../../../models/feedclasses");
var PagedFeed = Feedclasses.PagedFeed;
var Pagedfeedclasses = require("../../../../models/pagedfeedclasses");
var Validators1 = require("../../../../classes/validators");
var PagedFeedItemFormComponent = (function (_super) {
    __extends(PagedFeedItemFormComponent, _super);
    function PagedFeedItemFormComponent(injector) {
        var _this = _super.call(this, injector, PagedFeed, FeedTypeEnum.Paged) || this;
        _this.currentPage = 0;
        _this.pageTypeEnum = Enums.BasePageFeedTypeEnum;
        return _this;
    }
    PagedFeedItemFormComponent.prototype.currPage = function () {
        var pages = this.form.controls['baseFeedPages'];
        return pages.controls[this.currentPage];
    };
    PagedFeedItemFormComponent.prototype.addFormControls = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([], forms_1.Validators.minLength(2));
        this.model.baseFeedPages.forEach(function (x, i) { return formArray.push(_this.initPage(x)); });
        this.form.addControl('baseFeedPages', formArray);
        this.form.controls['baseFeedPages'].setValidators([forms_1.Validators.required, Validators1.minLengthArray(2), forms_1.Validators.maxLength(5)]);
    };
    ;
    PagedFeedItemFormComponent.prototype.removeFormControls = function () {
        this.form.removeControl('baseFeedPages');
    };
    ;
    PagedFeedItemFormComponent.prototype.initPage = function (page) {
        if (page === void 0) { page = null; }
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(page.id, []),
            createdAt: new forms_1.FormControl(page.createdAt, []),
            updatedAt: new forms_1.FormControl(page.updatedAt, []),
            pageNumber: new forms_1.FormControl(page.pageNumber, []),
            basePageFeedType: new forms_1.FormControl(page.basePageFeedType, [forms_1.Validators.required]),
            pagedFeedId: new forms_1.FormControl(page.pagedFeedId, []),
            title: new forms_1.FormControl(page.title, [])
        });
    };
    PagedFeedItemFormComponent.prototype.addPage = function () {
        var control = this.form.controls['baseFeedPages'];
        control.push(this.initPage(new Pagedfeedclasses.TextFeedPage({ pagedFeedId: this.model.id })));
        this.model.baseFeedPages.push(new Pagedfeedclasses.TextFeedPage({ pagedFeedId: this.model.id }));
        this.displayPage(control.length - 1);
    };
    PagedFeedItemFormComponent.prototype.removePage = function (index) {
        var control = this.form.controls['baseFeedPages'];
        if (this.currentPage > 0)
            this.displayPage(this.currentPage - 1);
        control.removeAt(index);
        this.model.baseFeedPages.splice(index, 1);
        this.form.markAsDirty();
    };
    PagedFeedItemFormComponent.prototype.displayPage = function (index) {
        var pages = this.form.controls['baseFeedPages'];
        if (index < 0 || index > (pages.length - 1))
            return;
        this.currentPage = index;
    };
    PagedFeedItemFormComponent.prototype.attachMedia = function (media) {
        var m = this.currPage().value;
        m.mediaInfoId = media.id;
        m.mediaInfo = media;
        this.model.baseFeedPages[this.currentPage] = m;
        this.currPage().controls.mediaInfoId.patchValue(media.id, { onlySelf: true });
        this.form.updateValueAndValidity();
    };
    PagedFeedItemFormComponent.prototype.pageHasProperty = function (modelType, propertyName) {
        switch (propertyName) {
            case 'bodyText':
                return modelType === Enums.BasePageFeedTypeEnum.Text ||
                    modelType === Enums.BasePageFeedTypeEnum.MediaText;
            case 'mediaInfoId':
                return modelType === Enums.BasePageFeedTypeEnum.Media ||
                    modelType === Enums.BasePageFeedTypeEnum.MediaText ||
                    modelType === Enums.BasePageFeedTypeEnum.MediaTabbedText;
            case 'tabs':
                return modelType === Enums.BasePageFeedTypeEnum.TabbedText ||
                    modelType === Enums.BasePageFeedTypeEnum.MediaTabbedText;
        }
        return false;
    };
    PagedFeedItemFormComponent.prototype.changePageType = function (modelType) {
        var m;
        switch (modelType) {
            case this.pageTypeEnum.Text:
                m = new Pagedfeedclasses.TextFeedPage(this.currPage().value);
                break;
            case this.pageTypeEnum.Media:
                m = new Pagedfeedclasses.MediaFeedPage(this.currPage().value);
                break;
            case this.pageTypeEnum.MediaText:
                m = new Pagedfeedclasses.MediaTextFeedPage(this.currPage().value);
                break;
            case this.pageTypeEnum.TabbedText:
                m = new Pagedfeedclasses.TabbedTextFeedPage(this.currPage().value);
                break;
            case this.pageTypeEnum.MediaTabbedText:
                m = new Pagedfeedclasses.MediaTabbedTextFeedPage(this.currPage().value);
                break;
        }
        m.id = 0;
        this.model.baseFeedPages[this.currentPage] = m;
        this.updateCurrentPageProperty('id', 0);
        this.updateCurrentPageProperty('basePageFeedType', modelType);
    };
    PagedFeedItemFormComponent.prototype.updateCurrentPageProperty = function (propName, value) {
        this.model.baseFeedPages[this.currentPage][propName] = value;
        this.currPage().controls[propName].patchValue(value, { onlySelf: true });
    };
    return PagedFeedItemFormComponent;
}(BasePartialItemFormComponent));
PagedFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'pagedfeeditem',
        template: require('./pagedfeeditem.component.html'),
        styles: [require('../feeditemform.component.css'), require('./pagedfeeditem.component.css')]
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], PagedFeedItemFormComponent);
exports.PagedFeedItemFormComponent = PagedFeedItemFormComponent;
//# sourceMappingURL=pagedfeeditem.component.js.map
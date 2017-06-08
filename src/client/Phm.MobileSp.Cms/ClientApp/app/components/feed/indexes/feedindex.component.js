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
var router_1 = require("@angular/router");
var feeddataservice_1 = require("../../../dataservices/feeddataservice");
var feeditemform_component_1 = require("../modelforms/feeditemform.component");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var FeedCategoryEnum = Enums.FeedCategoryEnum;
var base_component_1 = require("../../base.component");
var datashareservice_1 = require("../../../dataservices/datashareservice");
var Copytomarketcomponent = require("../modals/copytomarket.component");
var FeedItemCopyToMarket = Copytomarketcomponent.FeedItemCopyToMarket;
var CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
var FeedIndexComponent = (function (_super) {
    __extends(FeedIndexComponent, _super);
    function FeedIndexComponent(route, router, feedDataService, sharedService) {
        var _this = _super.call(this, sharedService, '', true) || this;
        _this.route = route;
        _this.router = router;
        _this.feedDataService = feedDataService;
        _this.feedFormData = null;
        _this.modalData = null;
        _this.feedTypes = FeedTypeEnum;
        _this.feedCats = FeedCategoryEnum;
        _this.setupSubscriptions();
        return _this;
    }
    FeedIndexComponent.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            _this.currentMarket = market;
            _this.feedItems = null;
            _this.getData();
        });
        this.sharedService.feedItemUpdated.subscribe(function (feedItem) {
            _this.updateFeedItem(feedItem);
        });
    };
    FeedIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id_sub = this.route.params.subscribe(function (params) {
            _this.feedItems = null;
            _this.catId = +params["feedCat"];
            _this.filteredFeed = !isNaN(_this.catId);
            _this.setPageTitle();
            _this.getData();
        });
    };
    FeedIndexComponent.prototype.ngOnDestroy = function () {
        if (this.id_sub) {
            this.id_sub.unsubscribe();
        }
    };
    FeedIndexComponent.prototype.setPageTitle = function () {
        if (!this.filteredFeed) {
            this.updatePageTitle("Feed");
        }
        else {
            this.updatePageTitle(FeedCategoryEnum[this.catId] + " Feed");
        }
    };
    FeedIndexComponent.prototype.getData = function () {
        var _this = this;
        if (!this.filteredFeed) {
            this.feedDataService.getFeeditems().subscribe(function (result) {
                _this.feedItems = _this.sortFeed(result);
            });
        }
        else {
            this.feedDataService.getFeeditemsByCat(this.catId).subscribe(function (result) {
                _this.feedItems = _this.sortFeed(result);
            });
        }
    };
    FeedIndexComponent.prototype.sortFeed = function (feedItem) {
        // basic ordering by Id descending, will need to replace with a more robust sorting mechanism / index management facility 
        return feedItem.sort(function (a, b) {
            if (a.id > b.id)
                return -1;
            if (a.id < b.id)
                return 1;
            return 0;
        });
    };
    FeedIndexComponent.prototype.updateFeedItem = function (feedItem, remove) {
        if (feedItem === void 0) { feedItem = null; }
        if (remove === void 0) { remove = false; }
        if (feedItem != null) {
            var origFeedItem = this.feedItems.find(function (x) { return x.id === feedItem.id; });
            var index = this.feedItems.indexOf(origFeedItem);
            if (!remove && (!this.filteredFeed || feedItem.feedCategory == this.catId)) {
                if (index > -1) {
                    this.feedItems.splice(index, 1, feedItem);
                }
                else {
                    this.feedItems.unshift(feedItem);
                }
            }
            else if (index > -1) {
                this.feedItems.splice(index, 1);
            }
        }
    };
    FeedIndexComponent.prototype.editFeedItem = function (feedItem, feedCat) {
        var _this = this;
        if (feedItem === void 0) { feedItem = null; }
        if (feedCat === void 0) { feedCat = null; }
        var inputs = { feedItem: feedItem, feedCat: feedCat, feedUpdated: this.getData() };
        var form = feeditemform_component_1.FeedItemForm;
        if (feedItem) {
            this.updatePageTitle("Edit Feed Content Form");
        }
        else {
            this.updatePageTitle("New Learning Content Form");
        }
        this.updateMarketDropdownVisibility(false);
        form.prototype.feedUpdated = new core_1.EventEmitter();
        form.prototype.feedUpdated.subscribe(function (feedItemResponse) {
            _this.setPageTitle();
            _this.updateMarketDropdownVisibility(true);
            _this.feedFormData = null;
        });
        this.feedFormData = {
            feedFormComponent: form,
            inputs: inputs
        };
    };
    FeedIndexComponent.prototype.copyFeedItemToMarket = function (feedItem) {
        var inputs = { model: feedItem, title: '', contentType: CopiedElementTypeEnum.Feed, marketContentService: this.feedDataService };
        var modelData = FeedItemCopyToMarket;
        this.modalData = {
            modalContent: modelData,
            inputs: inputs
        };
    };
    FeedIndexComponent.prototype.deleteFeeditem = function (feedItem) {
        var _this = this;
        if (confirm("Are you sure to delete " + feedItem.title + '?')) {
            this.feedDataService.deleteFeeditem(feedItem.id).subscribe(function (result) {
                if (result)
                    _this.updateFeedItem(feedItem, true);
            });
        }
    };
    FeedIndexComponent.prototype.publishFeedItemTolive = function (feedItem) {
        var _this = this;
        if (confirm("Are you sure to publish " + feedItem.title + '?')) {
            this.feedDataService.publishContentToLive(feedItem.id).subscribe(function (result) {
                if (result) {
                    _this.feedDataService.getFeeditem(feedItem.id).subscribe(function (result) {
                        if (result)
                            _this.updateFeedItem(result, false);
                    });
                }
            });
        }
    };
    return FeedIndexComponent;
}(base_component_1.BaseComponent));
FeedIndexComponent = __decorate([
    core_1.Component({
        selector: 'feedindex',
        template: require('./feedindex.component.html'),
        styles: [require('./feedindex.component.css')]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        feeddataservice_1.FeedDataService,
        datashareservice_1.ShareService])
], FeedIndexComponent);
exports.FeedIndexComponent = FeedIndexComponent;
//# sourceMappingURL=feedindex.component.js.map
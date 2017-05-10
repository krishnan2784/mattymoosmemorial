"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var router_1 = require("@angular/router");
var feeddataservice_1 = require("../../../dataservices/feeddataservice");
var feeditemform_component_1 = require("../modelforms/feeditemform.component");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var FeedCategoryEnum = Enums.FeedCategoryEnum;
var base_component_1 = require("../../base.component");
var datashareservice_1 = require("../../../dataservices/datashareservice");
var FeedIndexComponent = (function (_super) {
    __extends(FeedIndexComponent, _super);
    function FeedIndexComponent(route, router, feedDataService, sharedService) {
        var _this = _super.call(this, sharedService, '', true) || this;
        _this.route = route;
        _this.router = router;
        _this.feedDataService = feedDataService;
        _this.feedFormData = null;
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
    };
    FeedIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id_sub = this.route.params.subscribe(function (params) {
            _this.feedItems = null;
            _this.catId = +params["feedCat"];
            _this.filteredFeed = !isNaN(_this.catId);
            _this.setPageTitle();
            if (_this.currentMarket != null)
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
    FeedIndexComponent.prototype.updateFeedItem = function (feedItem, feedCat) {
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
            if (feedItemResponse != null) {
                var origFeedItem = _this.feedItems.find(function (x) { return x.id === feedItemResponse.id; });
                var index = _this.feedItems.indexOf(origFeedItem);
                if (!_this.filteredFeed || feedItemResponse.feedCategory == _this.catId) {
                    if (index > -1) {
                        _this.feedItems.splice(index, 1, feedItemResponse);
                    }
                    else {
                        _this.feedItems.unshift(feedItemResponse);
                    }
                }
                else if (index > -1) {
                    _this.feedItems.splice(index, 1);
                }
            }
            _this.setPageTitle();
            _this.updateMarketDropdownVisibility(true);
            _this.feedFormData = null;
        });
        this.feedFormData = {
            feedFormComponent: form,
            inputs: inputs
        };
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
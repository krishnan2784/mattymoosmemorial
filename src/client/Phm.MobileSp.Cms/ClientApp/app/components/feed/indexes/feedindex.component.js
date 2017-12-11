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
var feeddataservice_1 = require("../../../services/feeddataservice");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var FeedCategoryEnum = Enums.FeedCategoryEnum;
var shareservice_1 = require("../../../services/helpers/shareservice");
var tabnavmenu_component_1 = require("../../navmenu/tabnavmenu.component");
var CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var Feedclasses = require("../../../models/feedclasses");
var BaseFeed = Feedclasses.BaseFeed;
var permissionservice_1 = require("../../../services/helpers/permissionservice");
var index_component_1 = require("../../index.component");
var FeedIndexComponent = (function (_super) {
    __extends(FeedIndexComponent, _super);
    function FeedIndexComponent(route, router, feedDataService, sharedService, overlay, vcRef, confirmBox, permissionService) {
        var _this = _super.call(this, sharedService, permissionService, '', true, '', tabnavmenu_component_1.DefaultTabNavs.feedIndexTabs, '/feed') || this;
        _this.route = route;
        _this.router = router;
        _this.feedDataService = feedDataService;
        _this.confirmBox = confirmBox;
        _this.selectedModel = null;
        _this.selectedCopyToMarketModel = null;
        _this.modalData = null;
        _this.feedTypes = FeedTypeEnum;
        _this.feedCats = FeedCategoryEnum;
        _this.contentTypeEnum = CopiedElementTypeEnum;
        _this.canPublish = true;
        _this.setupSubscriptions();
        overlay.defaultViewContainer = vcRef;
        return _this;
    }
    FeedIndexComponent.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            _this.updateMarket();
        });
        //this.sharedService.feedItemUpdated.subscribe((feedItem) => {
        //    this.updateFeedItem(feedItem);
        //});
    };
    FeedIndexComponent.prototype.updateMarket = function () {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.currentMarket = this.sharedService.currentMarket;
        this.feedItems = null;
        this.getData();
    };
    FeedIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id_sub = this.route.params.subscribe(function (params) {
            _this.catId = +params["feedCat"];
            _this.filteredFeed = !isNaN(_this.catId);
            _this.setPageTitle();
            _this.updateMarket();
        });
    };
    FeedIndexComponent.prototype.ngOnDestroy = function () {
        if (this.id_sub)
            this.id_sub.unsubscribe();
        if (this.getFeedItemsSub)
            this.getFeedItemsSub.unsubscribe();
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
        if (this.getFeedItemsSub)
            this.getFeedItemsSub.unsubscribe();
        this.sharedService.updateMarketDropdownEnabledState(false);
        if (!this.filteredFeed) {
            this.getFeedItemsSub = this.feedDataService.getFeeditems().subscribe(function (result) {
                _this.feedItems = _this.sortFeed(result);
                _this.sharedService.updateMarketDropdownEnabledState(true);
            });
        }
        else {
            this.getFeedItemsSub = this.feedDataService.getFeeditemsByCat(this.catId).subscribe(function (result) {
                _this.feedItems = _this.sortFeed(result);
                _this.sharedService.updateMarketDropdownEnabledState(true);
            });
        }
    };
    FeedIndexComponent.prototype.sortFeed = function (feedItems) {
        if (feedItems === void 0) { feedItems = []; }
        // basic ordering by Id descending, will need to replace with a more robust sorting mechanism / index management facility 
        if (!feedItems)
            return feedItems;
        return feedItems.sort(function (a, b) {
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
        if (feedItem != null && this.feedItems != null) {
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
        if (feedItem === void 0) { feedItem = new BaseFeed(); }
        if (feedCat === void 0) { feedCat = null; }
        if (feedItem && feedItem.id > 0) {
            this.updatePageTitle("Edit Feed Content Form");
        }
        else {
            this.updatePageTitle("New Learning Content Form");
        }
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();
        this.selectedModel = feedItem;
    };
    FeedIndexComponent.prototype.feedItemUpdated = function () {
        this.feedItems = null;
        this.setPageTitle();
        this.updateMarketDropdownVisibility(true);
        this.updateTabNavItems(tabnavmenu_component_1.DefaultTabNavs.feedIndexTabs);
        this.selectedModel = null;
        this.getData();
    };
    FeedIndexComponent.prototype.copyFeedItemToMarket = function (feedItem) {
        this.selectedCopyToMarketModel = feedItem;
    };
    FeedIndexComponent.prototype.deleteFeeditem = function (feedItem) {
        var _this = this;
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
            .body("Are you sure to delete " + feedItem.title + '?')
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch(function (err) { return console.log('ERROR: ' + err); })
            .then(function (dialog) { return dialog.result; })
            .then(function (result) {
            _this.feedDataService.deleteFeeditem(feedItem.id).subscribe(function (result) {
                if (result)
                    _this.updateFeedItem(feedItem, true);
            });
        })
            .catch(function (err) { });
    };
    FeedIndexComponent.prototype.publishFeedItemTolive = function (feedItem) {
        var _this = this;
        if (!this.canPublish)
            return;
        var confirmText;
        if (feedItem.published && feedItem.publishedLiveAt) {
            confirmText = feedItem.title + " has already been published. Are you sure to overwrite it?";
        }
        else {
            confirmText = "Are you sure to publish " + feedItem.title + "?";
        }
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Publish')
            .body(confirmText)
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch(function (err) { return console.log('ERROR: ' + err); })
            .then(function (dialog) { return dialog.result; })
            .then(function (result) {
            _this.canPublish = false;
            _this.feedDataService.publishContentToLive(feedItem.id).subscribe(function (result) {
                if (result) {
                    _this.feedDataService.getFeeditem(feedItem.id).subscribe(function (result) {
                        if (result)
                            _this.updateFeedItem(result, false);
                    });
                }
                _this.canPublish = true;
            });
        })
            .catch(function (err) { _this.canPublish = true; });
    };
    return FeedIndexComponent;
}(index_component_1.IndexComponent));
FeedIndexComponent = __decorate([
    core_1.Component({
        selector: 'feedindex',
        template: require('./feedindex.component.html'),
        styles: [require('./feedindex.component.css')]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router,
        feeddataservice_1.FeedDataService, shareservice_1.ShareService,
        angular2_modal_1.Overlay, core_1.ViewContainerRef, bootstrap_1.Modal,
        permissionservice_1.PermissionService])
], FeedIndexComponent);
exports.FeedIndexComponent = FeedIndexComponent;
//# sourceMappingURL=feedindex.component.js.map
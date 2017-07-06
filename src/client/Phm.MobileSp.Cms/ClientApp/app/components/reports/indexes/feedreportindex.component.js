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
var base_component_1 = require("../../base.component");
var shareservice_1 = require("../../../services/helpers/shareservice");
var Feeditemreportcomponent = require("../feeditemreport.component");
var FeedItemReport = Feeditemreportcomponent.FeedItemReport;
var tabnavmenu_component_1 = require("../../navmenu/tabnavmenu.component");
var FeedReportIndexComponent = (function (_super) {
    __extends(FeedReportIndexComponent, _super);
    function FeedReportIndexComponent(route, router, feedDataService, sharedService) {
        var _this = _super.call(this, sharedService, 'Reports', true, '', tabnavmenu_component_1.DefaultTabNavs.reportsTabs) || this;
        _this.route = route;
        _this.router = router;
        _this.feedDataService = feedDataService;
        _this.feedTypes = FeedTypeEnum;
        _this.feedCats = FeedCategoryEnum;
        _this.selectedItem = null;
        _this.setupSubscriptions();
        return _this;
    }
    FeedReportIndexComponent.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            _this.updateMarket();
        });
    };
    FeedReportIndexComponent.prototype.updateMarket = function () {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.currentMarket = this.sharedService.currentMarket;
        this.selectedItem = null;
        this.feedItems = null;
        this.getData();
    };
    FeedReportIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id_sub = this.route.params.subscribe(function (params) {
            if (params["feedType"]) {
                _this.feedTypeId = +params["feedType"];
            }
            else
                _this.feedTypeId = FeedTypeEnum.Quiz;
            _this.updateMarket();
        });
    };
    FeedReportIndexComponent.prototype.ngOnDestroy = function () {
        if (this.id_sub) {
            this.id_sub.unsubscribe();
        }
    };
    FeedReportIndexComponent.prototype.setPageTitle = function () {
        this.updatePageTitle("Reports");
    };
    FeedReportIndexComponent.prototype.getData = function () {
        var _this = this;
        this.feedDataService.getFeeditemsByType(this.feedTypeId).subscribe(function (result) {
            if (result && result.length > 0) {
                result = result.filter(function (x) { return x.publishedLiveAt; });
                _this.feedItems = _this.sortFeed(result);
            }
        });
    };
    FeedReportIndexComponent.prototype.sortFeed = function (feedItem) {
        // basic ordering by Id descending, will need to replace with a more robust sorting mechanism / index management facility 
        return feedItem.sort(function (a, b) {
            if (a.id > b.id)
                return -1;
            if (a.id < b.id)
                return 1;
            return 0;
        });
    };
    FeedReportIndexComponent.prototype.viewFeedItemDetails = function (feedItem) {
        var _this = this;
        if (feedItem === void 0) { feedItem = null; }
        var inputs = { model: feedItem, pageTitle: '' };
        var report = FeedItemReport;
        this.updateMarketDropdownVisibility(false);
        this.updateBackText('Back to Reports Index');
        this.updatePageTitle(Enums.FeedTypeEnum[feedItem.feedType] + ' Analytics Reports');
        report.prototype.onBackEvent = new core_1.EventEmitter();
        report.prototype.onBackEvent.subscribe(function () {
            _this.setPageTitle();
            _this.updateMarketDropdownVisibility(true);
            _this.updateBackText('');
            _this.selectedItem = null;
        });
        this.selectedItem = {
            reportContent: FeedItemReport,
            inputs: inputs
        };
    };
    return FeedReportIndexComponent;
}(base_component_1.BaseComponent));
FeedReportIndexComponent = __decorate([
    core_1.Component({
        selector: 'feedreportindex',
        template: require('./feedreportindex.component.html'),
        styles: [require('./feedreportindex.component.css')]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        feeddataservice_1.FeedDataService,
        shareservice_1.ShareService])
], FeedReportIndexComponent);
exports.FeedReportIndexComponent = FeedReportIndexComponent;
//# sourceMappingURL=feedreportindex.component.js.map
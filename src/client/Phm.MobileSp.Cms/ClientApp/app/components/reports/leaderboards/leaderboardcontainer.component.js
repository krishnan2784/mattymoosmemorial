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
var feeddataservice_1 = require("../../../services/feeddataservice");
var base_component_1 = require("../../base.component");
var shareservice_1 = require("../../../services/helpers/shareservice");
var tabnavmenu_component_1 = require("../../navmenu/tabnavmenu.component");
var marketdataservice_1 = require("../../../services/marketdataservice");
var LeaderboardContainer = (function (_super) {
    __extends(LeaderboardContainer, _super);
    function LeaderboardContainer(feedDataService, sharedService, marketDataService) {
        var _this = _super.call(this, sharedService, 'Reports', true, '', tabnavmenu_component_1.DefaultTabNavs.reportsTabs) || this;
        _this.feedDataService = feedDataService;
        _this.marketDataService = marketDataService;
        _this.loading = true;
        _this.refineGroups = [];
        _this.reportData = null;
        _this.selectedUser = null;
        _this.backSub = null;
        _this.setupSubscriptions();
        _this.getData();
        return _this;
    }
    LeaderboardContainer.prototype.ngOnDestroy = function () {
        this.removeTooltip();
    };
    LeaderboardContainer.prototype.setupPageVariables = function () {
        this.updatePageTitle('Reports');
        this.updateMarketDropdownVisibility(true);
        this.updateBackText();
        this.updateTabNavItems(tabnavmenu_component_1.DefaultTabNavs.reportsTabs);
    };
    LeaderboardContainer.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            if (_this.loading)
                return;
            _this.updateMarket();
        });
    };
    LeaderboardContainer.prototype.updateMarket = function () {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.currentMarket = this.sharedService.currentMarket;
        this.myUpdatedData = undefined;
        this.leaderBoard = undefined;
        this.getData();
    };
    LeaderboardContainer.prototype.getData = function () {
        var _this = this;
        this.feedDataService.getLeaderBoard().subscribe(function (result) {
            _this.leaderBoard = result;
            _this.loading = false;
        });
        this.marketDataService.getMarketUserFilters().subscribe(function (result) {
            if (result && (result.regions.length > 0 || result.zones.length > 0)) {
                _this.refineGroups = [];
                if (result.regions.length > 0) {
                    var regions_1 = [];
                    result.regions.forEach(function (group) {
                        regions_1.push({ id: group.replace(" ", ""), name: group });
                    });
                    _this.refineGroups.push({
                        groupName: "Regions",
                        groupId: "regions",
                        height: "202px",
                        items: regions_1
                    });
                }
                if (result.areas.length > 0) {
                    var zones_1 = [];
                    result.areas.forEach(function (zone) {
                        zones_1.push({ id: zone.replace(" ", ""), name: zone });
                    });
                    _this.refineGroups.push({
                        groupName: "Zones",
                        groupId: "zones",
                        height: "145px",
                        items: zones_1
                    });
                }
            }
        });
    };
    LeaderboardContainer.prototype.getUpdateData = function (curDate1, curDate2) {
        var _this = this;
        if (curDate1 === void 0) { curDate1 = null; }
        if (curDate2 === void 0) { curDate2 = null; }
        this.feedDataService.getLeaderBoard(curDate1, curDate2).subscribe(function (result) {
            _this.myUpdatedData = result;
        });
    };
    LeaderboardContainer.prototype.getNewDataFromServer = function (event) {
        this.getUpdateData(event.date1, event.date2);
    };
    LeaderboardContainer.prototype.handleReport = function (event) {
    };
    LeaderboardContainer.prototype.viewUserBreakdown = function (event) {
        var _this = this;
        this.updatePageTitle('');
        this.updateMarketDropdownVisibility(false);
        this.updateBackText('Learners stats');
        this.updateTabNavItems();
        this.backSub = this.sharedService.goBackEvent.subscribe(function () {
            _this.handleBack();
        });
        this.selectedUser = event;
        this.removeTooltip();
        this.feedDataService.getUserPointsHistory(event.currentUser.id).subscribe(function (result) {
            if (result && result.length > 0) {
                _this.reportData = result;
            }
        });
    };
    LeaderboardContainer.prototype.handleBack = function () {
        this.setupPageVariables();
        this.backSub = null;
        this.selectedUser = null;
        this.reportData = null;
    };
    LeaderboardContainer.prototype.removeTooltip = function () {
        while ($('#tooltip').length > 0) {
            $('#tooltip').each(function (index, element) {
                $(element).remove();
            });
        }
    };
    return LeaderboardContainer;
}(base_component_1.BaseComponent));
LeaderboardContainer = __decorate([
    core_1.Component({
        selector: 'leaderboardcontainer',
        template: require('./leaderboardcontainer.component.html'),
        styles: [require('./leaderboardcontainer.component.css')]
    }),
    __metadata("design:paramtypes", [feeddataservice_1.FeedDataService, shareservice_1.ShareService, marketdataservice_1.MarketDataService])
], LeaderboardContainer);
exports.LeaderboardContainer = LeaderboardContainer;
//# sourceMappingURL=leaderboardcontainer.component.js.map
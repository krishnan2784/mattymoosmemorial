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
        _this.refineGroups = [
            {
                groupName: "Regions",
                groupId: "regions",
                height: "202px",
                items: [
                    {
                        id: 'region1',
                        name: "Region 1"
                    },
                    {
                        id: 'r2',
                        name: "Region 2"
                    }
                ]
            },
            {
                groupName: "Zones",
                groupId: "zones",
                height: "145px",
                items: [
                    {
                        id: 'zone1',
                        name: "Zone 1"
                    },
                    {
                        id: 'z2',
                        name: "Zone 2"
                    }
                ]
            }
        ];
        _this.reportData = null;
        _this.backSub = null;
        _this.setupSubscriptions();
        _this.getData();
        return _this;
    }
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
            if (!result || result.length < 2) {
                _this.leaderBoard = [{
                        "currentUser": { firstName: 'Bob', lastName: 'Hoskins' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer1",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 1000
                    }, {
                        "currentUser": { firstName: 'Barry', lastName: 'White' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer1",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 100
                    }, {
                        "currentUser": { firstName: 'Harry', lastName: 'Truman' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer1",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 300
                    }, {
                        "currentUser": { firstName: 'Bart', lastName: 'Hoskins' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer2",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 40
                    }, {
                        "currentUser": { firstName: 'Jack', lastName: 'Jones' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer2",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 350
                    }, {
                        "currentUser": { firstName: 'Sandra', lastName: 'Goldskin' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer3",
                        "zoneName": 'zone2',
                        "regionName": 'region1',
                        "totalMLearningPoints": 1000
                    }, {
                        "currentUser": { firstName: 'Roger', lastName: 'Redhat' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer3",
                        "zoneName": 'zone2',
                        "regionName": 'region1',
                        "totalMLearningPoints": 230
                    }, {
                        "currentUser": { firstName: 'Billy', lastName: 'Bluehat' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer4",
                        "zoneName": 'zone2',
                        "regionName": 'region1',
                        "totalMLearningPoints": 500
                    }, {
                        "currentUser": { firstName: 'Gary', lastName: 'Greenhat' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer4",
                        "zoneName": 'zone2',
                        "regionName": 'region1',
                        "totalMLearningPoints": 1230
                    }, {
                        "currentUser": { firstName: 'Harry', lastName: 'Hogsworth' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer5",
                        "zoneName": 'zone3',
                        "regionName": 'region2',
                        "totalMLearningPoints": 20
                    }, {
                        "currentUser": { firstName: 'Roger', lastName: 'Redhat' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer5",
                        "zoneName": 'zone3',
                        "regionName": 'region2',
                        "totalMLearningPoints": 230
                    }, {
                        "currentUser": { firstName: 'Bernie', lastName: 'Hogsworth' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer5",
                        "zoneName": 'zone3',
                        "regionName": 'region2',
                        "totalMLearningPoints": 200
                    }, {
                        "currentUser": { firstName: 'Rebecca', lastName: 'Redhat' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer5",
                        "zoneName": 'zone3',
                        "regionName": 'region2',
                        "totalMLearningPoints": 650
                    }, {
                        "currentUser": { firstName: 'Claire', lastName: 'Redfield' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer5",
                        "zoneName": 'zone3',
                        "regionName": 'region2',
                        "totalMLearningPoints": 20
                    }, {
                        "currentUser": { firstName: 'Roger', lastName: 'Redhat' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer5",
                        "zoneName": 'zone3',
                        "regionName": 'region2',
                        "totalMLearningPoints": 230
                    }, {
                        "currentUser": { firstName: 'Harry', lastName: 'Hogsworth' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer6",
                        "zoneName": 'zone6',
                        "regionName": 'region2',
                        "totalMLearningPoints": 200
                    }, {
                        "currentUser": { firstName: 'Roger', lastName: 'Redhat' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer6",
                        "zoneName": 'zone4',
                        "regionName": 'region2',
                        "totalMLearningPoints": 280
                    }];
            }
            else
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
                if (result.zones.length > 0) {
                    var zones_1 = [];
                    result.zones.forEach(function (zone) {
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
            if (!result || result.length < 2) {
                _this.myUpdatedData = [{
                        "currentUser": { firstName: 'Bob', lastName: 'Hoskins' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer1",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 1000
                    }, {
                        "currentUser": { firstName: 'Barry', lastName: 'White' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer1",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 100
                    }, {
                        "currentUser": { firstName: 'Harry', lastName: 'Truman' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer1",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 300
                    }, {
                        "currentUser": { firstName: 'Bart', lastName: 'Hoskins' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer2",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 40
                    }, {
                        "currentUser": { firstName: 'Jack', lastName: 'Jones' },
                        "roleName": 'Sales Exec',
                        "dealershipCode": "dealer2",
                        "zoneName": 'zone1',
                        "regionName": 'region1',
                        "totalMLearningPoints": 350
                    }, {
                        "currentUser": { firstName: 'Sandra', lastName: 'Goldskin' },
                        "roleName": 'Sales Manager',
                        "dealershipCode": "dealer3",
                        "zoneName": 'zone2',
                        "regionName": 'region1',
                        "totalMLearningPoints": 1000
                    }];
            }
            else
                _this.myUpdatedData = result;
        });
    };
    LeaderboardContainer.prototype.getNewDataFromServer = function (event) {
        console.log(event);
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
            _this.setupPageVariables();
            _this.backSub = null;
        });
        this.feedDataService.getUserPointsHistory(event.userId, event.date1, event.date2).subscribe(function (result) {
            _this.reportData = result;
        });
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
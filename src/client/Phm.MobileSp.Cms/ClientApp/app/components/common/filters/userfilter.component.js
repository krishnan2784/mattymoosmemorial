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
var Shareservice = require("../../../services/helpers/shareservice");
var marketdataservice_1 = require("../../../services/marketdataservice");
var userdataservice_1 = require("../../../services/userdataservice");
var ShareService = Shareservice.ShareService;
var UserFilter = (function () {
    function UserFilter(sharedService, marketDataService, userDataService) {
        this.sharedService = sharedService;
        this.marketDataService = marketDataService;
        this.userDataService = userDataService;
        this.renderTextSearch = false;
        this.renderPointRange = false;
        this.renderPointDateRange = false;
        this.rangeFrom = 0;
        this.rangeTo = 100;
        this.renderUserGroupFilter = false;
        this.renderRegionFilter = false;
        this.renderZoneFilter = false;
        this.renderDealershipFilter = false;
        this.criteriaChanged = new core_1.EventEmitter();
        this.criteria = new UserFilters();
        this.getMarketFilters();
        this.setupSubscriptions();
    }
    UserFilter.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.renderPointRange)
            setTimeout(function () {
                _this.setupRangeSlider();
            }, 10);
    };
    UserFilter.prototype.ngOnDestroy = function () {
    };
    UserFilter.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            _this.nullAllFilters();
            _this.getMarketFilters();
        });
    };
    UserFilter.prototype.broadcastChanges = function () {
        var _this = this;
        setTimeout(function () {
            _this.criteria.userGroupFilters = _this.criteria.allUserGroupFilters.filter(function (x) { return x.checked; });
            _this.criteria.dealershipFilters = _this.criteria.allDealershipFilters.filter(function (x) { return x.checked; });
            _this.criteria.regionFilters = _this.criteria.allRegionFilters.filter(function (x) { return x.checked; });
            _this.criteria.zoneFilters = _this.criteria.allZoneFilters.filter(function (x) { return x.checked; });
            _this.criteriaChanged.emit(_this.criteria);
        }, 50);
    };
    UserFilter.prototype.getMarketFilters = function () {
        var _this = this;
        this.marketDataService.getMarketUserFilters().subscribe(function (result) {
            if (result) {
                _this.emptyAllFilters();
                if (_this.renderDealershipFilter && result.dealershipNames) {
                    result.dealershipNames.forEach(function (group) {
                        _this.criteria.allDealershipFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                }
                if (_this.renderRegionFilter && result.regions) {
                    result.regions.forEach(function (group) {
                        _this.criteria.allRegionFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                }
                if (_this.renderZoneFilter && result.zones) {
                    result.zones.forEach(function (group) {
                        _this.criteria.allZoneFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                }
            }
        });
        if (this.renderUserGroupFilter) {
            this.userDataService.getUserGroups().subscribe(function (result) {
                _this.criteria.allUserGroupFilters = [];
                if (result) {
                    result.userGroupNames.forEach(function (group) {
                        _this.criteria.allUserGroupFilters.push({ id: group.id, text: group.name, checked: false });
                    });
                }
            });
        }
    };
    UserFilter.prototype.nullAllFilters = function () {
        this.criteria.allUserGroupFilters = null;
        this.criteria.allDealershipFilters = null;
        this.criteria.allRegionFilters = null;
        this.criteria.allZoneFilters = null;
    };
    UserFilter.prototype.emptyAllFilters = function () {
        this.criteria.allUserGroupFilters = [];
        this.criteria.allDealershipFilters = [];
        this.criteria.allRegionFilters = [];
        this.criteria.allZoneFilters = [];
    };
    UserFilter.prototype.clearFilters = function () {
        this.criteria.allUserGroupFilters.forEach(function (x) { return x.checked = false; });
        this.criteria.allDealershipFilters.forEach(function (x) { return x.checked = false; });
        this.criteria.allRegionFilters.forEach(function (x) { return x.checked = false; });
        this.criteria.allZoneFilters.forEach(function (x) { return x.checked = false; });
        this.criteria.searchString = "";
        if (this.renderPointRange)
            this.resetRange();
    };
    UserFilter.prototype.clearUserFilters = function () {
        this.criteria.allUserGroupFilters.forEach(function (x) { return x.checked = false; });
    };
    UserFilter.prototype.clearDealerFilters = function () {
        this.criteria.allDealershipFilters.forEach(function (x) { return x.checked = false; });
    };
    UserFilter.prototype.clearZoneFilters = function () {
        this.criteria.allZoneFilters.forEach(function (x) { return x.checked = false; });
    };
    UserFilter.prototype.clearRegionFilters = function () {
        this.criteria.allRegionFilters.forEach(function (x) { return x.checked = false; });
    };
    UserFilter.prototype.setupRangeSlider = function () {
        var _this = this;
        $("#sliderElement").ionRangeSlider({
            type: "double",
            min: this.rangeFrom,
            max: this.rangeTo,
            grid: false,
            from: this.criteria.pointsRangeBottom,
            to: this.criteria.pointsRangeTop,
            decorate_both: false,
            onFinish: function (event) { return _this.onSliderChange(event); }
        });
    };
    UserFilter.prototype.resetRange = function () {
        this.criteria.pointsRangeBottom = 0;
        this.criteria.pointsRangeTop = 100;
        var slider = $("#sliderElement").data("ionRangeSlider");
        slider.reset();
    };
    UserFilter.prototype.onSliderChange = function (event) {
        if (this.criteria.pointsRangeBottom === event.from && this.criteria.pointsRangeTop === event.to)
            return;
        this.criteria.pointsRangeBottom = event.from;
        this.criteria.pointsRangeTop = event.to;
        this.broadcastChanges();
    };
    return UserFilter;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UserFilter.prototype, "renderTextSearch", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UserFilter.prototype, "renderPointRange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UserFilter.prototype, "renderPointDateRange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], UserFilter.prototype, "rangeFrom", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], UserFilter.prototype, "rangeTo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UserFilter.prototype, "renderUserGroupFilter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UserFilter.prototype, "renderRegionFilter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UserFilter.prototype, "renderZoneFilter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], UserFilter.prototype, "renderDealershipFilter", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], UserFilter.prototype, "criteriaChanged", void 0);
UserFilter = __decorate([
    core_1.Component({
        selector: 'userfilter',
        template: require('./userfilter.component.html'),
        styles: [require('./userfilter.component.css'), require('./ion.rangeSlider.custom.css')]
    }),
    __metadata("design:paramtypes", [ShareService, marketdataservice_1.MarketDataService, userdataservice_1.UserDataService])
], UserFilter);
exports.UserFilter = UserFilter;
var UserFilters = (function () {
    function UserFilters() {
        this.userGroupFilters = [];
        this.dealershipFilters = [];
        this.zoneFilters = [];
        this.regionFilters = [];
        this.pointsRangeBottom = 0;
        this.pointsRangeTop = 100;
        this.searchString = "";
    }
    return UserFilters;
}());
exports.UserFilters = UserFilters;
//# sourceMappingURL=userfilter.component.js.map
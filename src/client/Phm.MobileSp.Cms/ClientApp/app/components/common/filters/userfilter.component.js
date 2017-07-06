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
var ShareService = Shareservice.ShareService;
var Feeddataservice = require("../../../services/feeddataservice");
var FeedDataService = Feeddataservice.FeedDataService;
var Userdataservice = require("../../../services/userdataservice");
var UserDataService = Userdataservice.UserDataService;
var UserFilter = (function () {
    function UserFilter(sharedService, feedDataService, userDataService) {
        this.sharedService = sharedService;
        this.feedDataService = feedDataService;
        this.userDataService = userDataService;
        this.renderTextSearch = false;
        this.renderPointRange = false;
        this.renderPointDateRange = false;
        this.renderUserGroupFilter = false;
        this.renderRegionFilter = false;
        this.renderZoneFilter = false;
        this.renderDealershipFilter = false;
        this.criteriaChanged = new core_1.EventEmitter();
        this.criteria = new UserFilters();
        this.slideChangeBusy = false;
        this.getMarketFilters();
    }
    UserFilter.prototype.ngAfterViewInit = function () {
        if (this.renderPointRange)
            this.setupRangeSlider();
    };
    UserFilter.prototype.ngOnDestroy = function () {
        var slider = document.getElementById('scoreRange');
        if (slider) {
            slider.noUiSlider.off('end');
        }
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
        this.feedDataService.getQuizSummaryFilters().subscribe(function (result) {
            if (result) {
                if (_this.renderUserGroupFilter && result.userGroupNames) {
                    _this.criteria.allUserGroupFilters = [];
                    result.userGroupNames.forEach(function (group) {
                        _this.criteria.allUserGroupFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                }
                if (_this.renderDealershipFilter && result.dealershipNames) {
                    _this.criteria.allDealershipFilters = [];
                    result.dealershipNames.forEach(function (group) {
                        _this.criteria.allDealershipFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                }
                _this.criteria.allZoneFilters = [];
                _this.criteria.allRegionFilters = [];
                _this.criteria.allRegionFilters.push({ id: 'Region 1', text: 'Region 1', checked: false });
                _this.criteria.allRegionFilters.push({ id: 'Region 2', text: 'Region 2', checked: false });
                _this.criteria.allRegionFilters.push({ id: 'Region 3', text: 'Region 3', checked: false });
                _this.criteria.allZoneFilters.push({ id: 'Zone 1', text: 'Zone 1', checked: false });
                _this.criteria.allZoneFilters.push({ id: 'Zone 2', text: 'Zone 2', checked: false });
                _this.criteria.allZoneFilters.push({ id: 'Zone 3', text: 'Zone 3', checked: false });
            }
        });
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
    UserFilter.prototype.resetRange = function () {
        var slider = document.getElementById('scoreRange');
        slider.noUiSlider.reset();
        this.onSliderChange();
    };
    UserFilter.prototype.enableSlider = function () {
        this.setSliderEvent();
        this.slideChangeBusy = false;
    };
    UserFilter.prototype.setupRangeSlider = function () {
        var _this = this;
        var slider = document.getElementById('scoreRange');
        noUiSlider.create(slider, { start: [0, 100],
            connect: true,
            step: 5,
            tooltips: [true, true],
            behaviour: 'drag',
            range: {
                'min': 0,
                'max': 100
            }
        });
        setTimeout(function () { _this.setSliderEvent(); }, 500);
    };
    UserFilter.prototype.setSliderEvent = function () {
        var _this = this;
        var slider = document.getElementById('scoreRange');
        slider.noUiSlider.on('end', function () { _this.onSliderChange(); });
    };
    UserFilter.prototype.onSliderChange = function () {
        console.log(this.slideChangeBusy);
        var slider = document.getElementById('scoreRange');
        if (slider) {
            var sliderVals = slider.noUiSlider.get();
            var botRange = parseInt(sliderVals[0]);
            var topRange = parseInt(sliderVals[1]);
            if ((this.criteria.pointsRangeBottom === botRange && this.criteria.pointsRangeTop === topRange) || this.slideChangeBusy)
                return;
            slider.noUiSlider.off('end');
            this.slideChangeBusy = true;
            this.criteria.pointsRangeBottom = botRange;
            this.criteria.pointsRangeTop = topRange;
            this.broadcastChanges();
            this.enableSlider();
        }
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
        styles: [require('./userfilter.component.css')]
    }),
    __metadata("design:paramtypes", [ShareService, FeedDataService, UserDataService])
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
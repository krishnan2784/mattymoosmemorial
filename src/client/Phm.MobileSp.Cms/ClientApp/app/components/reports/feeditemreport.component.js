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
var Datashareservice = require("../../services/helpers/shareservice");
var ShareService = Datashareservice.ShareService;
var Enums = require("../../enums");
var Feeddataservice = require("../../services/feeddataservice");
var FeedDataService = Feeddataservice.FeedDataService;
var Chartclasses = require("../../models/chartclasses");
var BarChartData = Chartclasses.BarChartData;
var GaugeChartData = Chartclasses.GaugeChartData;
var DonutChartData = Chartclasses.DonutChartData;
var Date1 = require("../../classes/helpers/date");
var DateEx = Date1.DateEx;
var FeedItemReport = (function () {
    function FeedItemReport(sharedService, feedDataService, injector) {
        var _this = this;
        this.sharedService = sharedService;
        this.feedDataService = feedDataService;
        this.injector = injector;
        this.feedTypes = Enums.FeedTypeEnum;
        this.rangeBottom = 0;
        this.rangeTop = 100;
        this.userGroupFilters = [];
        this.dealershipFilters = [];
        this.searchString = "";
        this.slideChangeBusy = false;
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
        this.getMarketFilters();
        this.sharedService.goBackEvent.subscribe(function () {
            _this.onBackEvent.emit();
        });
    }
    Object.defineProperty(FeedItemReport.prototype, "filteredListData", {
        get: function () {
            return this.filterResultList();
        },
        enumerable: true,
        configurable: true
    });
    ;
    FeedItemReport.prototype.ngOnInit = function () {
        this.getData();
    };
    FeedItemReport.prototype.ngAfterViewInit = function () {
        this.setupRangeSlider();
    };
    FeedItemReport.prototype.ngOnDestroy = function () {
        var slider = document.getElementById('scoreRange');
        if (slider) {
            slider.noUiSlider.off('end');
        }
    };
    FeedItemReport.prototype.getData = function () {
        this.getHeaderData();
        this.getResultListData();
    };
    FeedItemReport.prototype.getHeaderData = function () {
        var _this = this;
        this.feedDataService.getFeedItemReport(this.model.id).subscribe(function (result) {
            if (result.success) {
                _this.summaryData = result.content;
                _this.updateReport();
            }
            else {
                Materialize.toast(result.message, 5000, 'red');
                _this.goBack();
            }
        });
    };
    FeedItemReport.prototype.getResultListData = function () {
        var _this = this;
        this.feedDataService.getFeedItemResultList(this.model.id, this.rangeBottom, this.rangeTop, 0).subscribe(function (result) {
            _this.listData = result.content;
        });
    };
    FeedItemReport.prototype.filterResultList = function () {
        if (!this.listData)
            return null;
        var data = Object.assign([], this.listData);
        var userFilters = this.userGroupFilters.filter(function (x) { return x.checked; });
        if (userFilters.length > 0)
            data = data.filter(function (x) { return userFilters.filter(function (y) { return y.text === x.mainUserGroup; }).length > 0; });
        var dealerFilters = this.dealershipFilters.filter(function (x) { return x.checked; });
        if (dealerFilters.length > 0)
            data = data.filter(function (x) { return dealerFilters.filter(function (y) { return y.text === x.dealershipName; }).length > 0; });
        if (this.searchString !== "") {
            var search = this.searchString.toLowerCase();
            data = data.filter(function (x) { return x.user.firstName.toLowerCase().indexOf(search) > -1
                || x.user.lastName.toLowerCase().indexOf(search) > -1; });
        }
        return data;
    };
    FeedItemReport.prototype.getMarketFilters = function () {
        var _this = this;
        this.feedDataService.getQuizSummaryFilters().subscribe(function (result) {
            if (result) {
                if (result.userGroupNames) {
                    result.userGroupNames.forEach(function (group) {
                        _this.userGroupFilters.push({ id: group.replace(" ", "_"), text: group, checked: false });
                    });
                }
                if (result.dealershipNames) {
                    result.dealershipNames.forEach(function (group) {
                        _this.dealershipFilters.push({ id: group.replace(" ", "_"), text: group, checked: false });
                    });
                }
            }
        });
    };
    FeedItemReport.prototype.updateReport = function () {
        this.updateGaugeData();
        this.updateDonutData();
        this.updateBarData();
    };
    FeedItemReport.prototype.updateGaugeData = function () {
        var gaugeData = new GaugeChartData({
            height: 150,
            showTooltip: true,
            chartData: [
                {
                    name: 'Passed',
                    colour: '#9F378E',
                    data: (this.summaryData.passed / this.summaryData.submitted) * 100
                }
            ]
        });
        this.passRatioData = gaugeData;
    };
    FeedItemReport.prototype.updateDonutData = function () {
        var donutData = new DonutChartData({
            showLegend: false,
            showTooltip: false,
            title: this.summaryData.averageScore + '%',
            chartData: [
                {
                    name: 'Average Score',
                    colour: '#9F378E',
                    data: [this.summaryData.averageScore]
                }, {
                    name: 'Blank',
                    colour: '#ECECEC',
                    data: [100 - this.summaryData.averageScore]
                }
            ]
        });
        this.averageScoreData = donutData;
    };
    FeedItemReport.prototype.updateBarData = function () {
        var dates = [];
        var _loop_1 = function (submission) {
            var formatted = DateEx.formatDate(new Date(submission), "dd/MM");
            var existing = dates.find(function (x) { return x.x === formatted; });
            if (existing) {
                dates.splice(dates.indexOf(existing), 1, { x: formatted, y: existing.y + 1 });
            }
            else {
                dates.push({ x: formatted, y: 1 });
            }
        };
        for (var submission in this.summaryData.submissions) {
            _loop_1(submission);
        }
        var barData = new BarChartData({
            showTooltip: true,
            showYAxis: false,
            showXAxis: true,
            chartData: [{
                    name: 'Number of learners',
                    colour: '#9F378E',
                    data: dates
                }]
        });
        this.averageTimeData = barData;
    };
    FeedItemReport.prototype.clearFilters = function () {
        this.userGroupFilters.forEach(function (x) { return x.checked = false; });
        this.dealershipFilters.forEach(function (x) { return x.checked = false; });
        this.searchString = "";
        this.resetRange();
    };
    FeedItemReport.prototype.clearUserFilters = function () {
        this.userGroupFilters.forEach(function (x) { return x.checked = false; });
    };
    FeedItemReport.prototype.clearDealerFilters = function () {
        this.dealershipFilters.forEach(function (x) { return x.checked = false; });
    };
    FeedItemReport.prototype.resetRange = function () {
        var slider = document.getElementById('scoreRange');
        slider.noUiSlider.reset();
        this.onSliderChange();
    };
    FeedItemReport.prototype.enableSlider = function () {
        this.setSliderEvent();
        this.slideChangeBusy = false;
    };
    FeedItemReport.prototype.setupRangeSlider = function () {
        var _this = this;
        var slider = document.getElementById('scoreRange');
        noUiSlider.create(slider, {
            start: [0, 100],
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
    FeedItemReport.prototype.setSliderEvent = function () {
        var _this = this;
        var slider = document.getElementById('scoreRange');
        slider.noUiSlider.on('end', function () { _this.onSliderChange(); });
    };
    FeedItemReport.prototype.onSliderChange = function () {
        console.log(this.slideChangeBusy);
        var slider = document.getElementById('scoreRange');
        if (slider) {
            var sliderVals = slider.noUiSlider.get();
            var botRange = parseInt(sliderVals[0]);
            var topRange = parseInt(sliderVals[1]);
            if ((this.rangeBottom === botRange && this.rangeTop === topRange) || this.slideChangeBusy)
                return;
            slider.noUiSlider.off('end');
            this.slideChangeBusy = true;
            this.rangeBottom = botRange;
            this.rangeTop = topRange;
            this.listData = null;
            this.getResultListData();
            this.enableSlider();
        }
    };
    FeedItemReport.prototype.goBack = function () {
        var slider = document.getElementById('scoreRange');
        if (slider) {
            slider.noUiSlider.off('end');
        }
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    };
    return FeedItemReport;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FeedItemReport.prototype, "onBackEvent", void 0);
FeedItemReport = __decorate([
    core_1.Component({
        selector: 'feeditemreport',
        template: require('./feeditemreport.component.html'),
        styles: [require('./feeditemreport.component.css')]
    }),
    __metadata("design:paramtypes", [ShareService, FeedDataService,
        core_1.Injector])
], FeedItemReport);
exports.FeedItemReport = FeedItemReport;
//# sourceMappingURL=feeditemreport.component.js.map
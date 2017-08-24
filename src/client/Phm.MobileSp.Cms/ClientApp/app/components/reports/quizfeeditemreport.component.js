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
var DonutChartData = Chartclasses.DonutChartData;
var Reportclasses = require("../../models/reportclasses");
var FeedItemSummary = Reportclasses.FeedItemSummary;
var Date1 = require("../../classes/helpers/date");
var DateEx = Date1.DateEx;
var Userfiltercomponent = require("../common/filters/userfilter.component");
var string_1 = require("../../classes/helpers/string");
var UserFilters = Userfiltercomponent.UserFilters;
var QuizFeedItemReport = (function () {
    function QuizFeedItemReport(sharedService, feedDataService, injector) {
        var _this = this;
        this.sharedService = sharedService;
        this.feedDataService = feedDataService;
        this.injector = injector;
        this.feedTypes = Enums.FeedTypeEnum;
        this.filterCriteria = new UserFilters();
        this.searchString = '';
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
        this.backSub = this.sharedService.goBackEvent.subscribe(function () {
            _this.onBackEvent.emit();
        });
    }
    QuizFeedItemReport.prototype.ngOnInit = function () {
        this.getData();
    };
    QuizFeedItemReport.prototype.ngAfterViewInit = function () {
    };
    QuizFeedItemReport.prototype.ngOnDestroy = function () {
    };
    QuizFeedItemReport.prototype.getData = function () {
        this.getHeaderData();
        this.getResultListData();
    };
    QuizFeedItemReport.prototype.getHeaderData = function () {
        var _this = this;
        this.feedDataService.getQuizFeedItemReport(this.model.id).subscribe(function (result) {
            if (result.success) {
                if (result.content) {
                    _this.summaryData = result.content;
                    _this.updateReport();
                }
                else
                    _this.summaryData = new FeedItemSummary();
            }
            else {
                Materialize.toast(result.message, 5000, 'red');
                _this.goBack();
            }
        });
    };
    QuizFeedItemReport.prototype.getResultListData = function () {
        var _this = this;
        this.feedDataService.getFeedItemResultList(this.model.id, this.filterCriteria.pointsRangeBottom, this.filterCriteria.pointsRangeTop, 0).subscribe(function (result) {
            _this.listData = result.content;
            _this.filterResultList();
        });
    };
    QuizFeedItemReport.prototype.filterUpdate = function (criteria) {
        this.filterCriteria = criteria;
        this.filterResultList();
    };
    QuizFeedItemReport.prototype.filterResultList = function () {
        var _this = this;
        if (!this.listData)
            return null;
        var data = Object.assign([], this.listData);
        if (this.filterCriteria.userGroupFilters.length > 0)
            data = data.filter(function (x) { return _this.filterCriteria.userGroupFilters.filter(function (y) { return y.text === x.mainUserGroup; }).length > 0; });
        if (this.filterCriteria.dealershipFilters.length > 0)
            data = data.filter(function (x) { return _this.filterCriteria.dealershipFilters.filter(function (y) { return y.text === x.dealershipName; }).length > 0; });
        data = data.filter(function (x) { return x.resultPercentage >= _this.filterCriteria.pointsRangeBottom &&
            x.resultPercentage <= _this.filterCriteria.pointsRangeTop; });
        if (this.searchString !== "") {
            data = string_1.StringEx.searchArray(this.searchString, data, ['user.firstName', 'user.lastName']);
        }
        this.filteredListData = data;
    };
    QuizFeedItemReport.prototype.updateReport = function () {
        this.updateGaugeData();
        this.updateDonutData();
        this.updateBarData();
    };
    QuizFeedItemReport.prototype.updateGaugeData = function () {
        this.passRatioData = (this.summaryData.passed / this.summaryData.submitted) * 100;
    };
    QuizFeedItemReport.prototype.updateDonutData = function () {
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
    QuizFeedItemReport.prototype.updateBarData = function () {
        var dates = [];
        var _loop_1 = function (submission) {
            var formatted = DateEx.formatDate(new Date(submission), "dd/MM");
            var existing = dates.find(function (x) { return x.label === formatted; });
            if (existing) {
                dates.splice(dates.indexOf(existing), 1, { label: formatted, percent: existing.percent + 1 });
            }
            else {
                dates.push({ label: formatted, percent: 1 });
            }
        };
        for (var submission in this.summaryData.submissions) {
            _loop_1(submission);
        }
        this.averageTimeData = {
            legendText: "Submissions",
            footerText: "Allocated time (days)",
            data: dates
        };
    };
    QuizFeedItemReport.prototype.goBack = function () {
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    };
    QuizFeedItemReport.prototype.viewQuizBreakdown = function (result) {
        var _this = this;
        this.backSub.unsubscribe();
        this.selectedQuizResult = result;
        this.sharedService.updateBackButton('Learners stats');
        this.backSub = this.sharedService.goBackEvent.subscribe(function () {
            _this.backSub.unsubscribe();
            _this.sharedService.updateBackButton(Enums.FeedTypeEnum[_this.model.feedType] + ' Reports');
            _this.selectedQuizResult = null;
            _this.backSub = _this.sharedService.goBackEvent.subscribe(function () {
                _this.onBackEvent.emit();
            });
        });
    };
    return QuizFeedItemReport;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], QuizFeedItemReport.prototype, "onBackEvent", void 0);
QuizFeedItemReport = __decorate([
    core_1.Component({
        selector: 'quizfeeditemreport',
        template: require('./quizfeeditemreport.component.html'),
        styles: [require('./quizfeeditemreport.component.css')]
    }),
    __metadata("design:paramtypes", [ShareService, FeedDataService,
        core_1.Injector])
], QuizFeedItemReport);
exports.QuizFeedItemReport = QuizFeedItemReport;
//# sourceMappingURL=quizfeeditemreport.component.js.map
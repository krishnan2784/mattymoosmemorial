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
var Reportclasses = require("../../models/reportclasses");
var SurveyItemSummary = Reportclasses.SurveyItemSummary;
var Date1 = require("../../classes/helpers/date");
var DateEx = Date1.DateEx;
var ObservationFeedItemReport = (function () {
    function ObservationFeedItemReport(sharedService, feedDataService, injector) {
        var _this = this;
        this.sharedService = sharedService;
        this.feedDataService = feedDataService;
        this.injector = injector;
        this.feedTypes = Enums.FeedTypeEnum;
        this.listData = [];
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
        this.sharedService.goBackEvent.subscribe(function () {
            _this.onBackEvent.emit();
        });
    }
    ObservationFeedItemReport.prototype.ngOnInit = function () {
        this.getData();
    };
    ObservationFeedItemReport.prototype.ngAfterViewInit = function () {
    };
    ObservationFeedItemReport.prototype.ngOnDestroy = function () {
    };
    ObservationFeedItemReport.prototype.getData = function () {
        var _this = this;
        this.feedDataService.getSurveyFeedSummaries(this.model.id).subscribe(function (result) {
            if (result.content) {
                _this.summaryData = new SurveyItemSummary(result.content);
                _this.updateGaugeData();
                _this.updateBarData();
                _this.updateListData();
            }
            else
                _this.summaryData = new SurveyItemSummary();
            _this.updateGaugeData();
            _this.updateBarData();
            _this.updateListData();
        });
    };
    ObservationFeedItemReport.prototype.updateGaugeData = function () {
        var gaugeData = new GaugeChartData({
            height: 150,
            showTooltip: true,
            chartData: [
                {
                    name: 'Submitted',
                    colour: '#9F378E',
                    data: (this.summaryData.submitted / this.summaryData.totalRecipents) * 100
                }
            ]
        });
        this.submissionRateData = gaugeData;
    };
    ObservationFeedItemReport.prototype.updateBarData = function () {
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
        if (dates.length == 0) {
            dates.push({ x: "11/07", y: 2 });
            dates.push({ x: "12/07", y: 4 });
        }
        var barData = new BarChartData({
            width: 500,
            showTooltip: true,
            showYAxis: false,
            showXAxis: true,
            chartData: [{
                    name: 'Allocated time (days)',
                    colour: '#9F378E',
                    data: dates
                }]
        });
        this.averageTimeData = barData;
    };
    ObservationFeedItemReport.prototype.updateListData = function () {
        var _this = this;
        if (this.model && this.summaryData) {
            for (var _i = 0, _a = this.model.questions; _i < _a.length; _i++) {
                var question = _a[_i];
                var data = [];
                question.answers.forEach(function (x) {
                    data.push({
                        percent: _this.summaryData.surveyFeedResults.filter(function (y) { return y.surverQuestionAnwerId == x.id; })[0].percentage,
                        label: x.answer
                    });
                });
                this.listData.push({
                    title: question.question,
                    data: data
                });
            }
            ;
        }
    };
    ObservationFeedItemReport.prototype.goBack = function () {
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    };
    return ObservationFeedItemReport;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ObservationFeedItemReport.prototype, "onBackEvent", void 0);
ObservationFeedItemReport = __decorate([
    core_1.Component({
        selector: 'observationfeeditemreport',
        template: require('./observationfeeditemreport.component.html'),
        styles: [require('./quizfeeditemreport.component.css'), require('./observationfeeditemreport.component.css')]
    }),
    __metadata("design:paramtypes", [ShareService, FeedDataService,
        core_1.Injector])
], ObservationFeedItemReport);
exports.ObservationFeedItemReport = ObservationFeedItemReport;
//# sourceMappingURL=observationfeeditemreport.component.js.map
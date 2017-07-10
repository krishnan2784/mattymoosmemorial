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
var Date1 = require("../../classes/helpers/date");
var DateEx = Date1.DateEx;
var SurveyFeedItemReport = (function () {
    function SurveyFeedItemReport(sharedService, feedDataService, injector) {
        var _this = this;
        this.sharedService = sharedService;
        this.feedDataService = feedDataService;
        this.injector = injector;
        this.feedTypes = Enums.FeedTypeEnum;
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
        this.sharedService.goBackEvent.subscribe(function () {
            _this.onBackEvent.emit();
        });
    }
    SurveyFeedItemReport.prototype.ngOnInit = function () {
        this.getData();
    };
    SurveyFeedItemReport.prototype.ngAfterViewInit = function () {
    };
    SurveyFeedItemReport.prototype.ngOnDestroy = function () {
    };
    SurveyFeedItemReport.prototype.getData = function () {
        this.getHeaderData();
        this.getResultListData();
    };
    SurveyFeedItemReport.prototype.getHeaderData = function () {
        var _this = this;
        this.feedDataService.getQuizFeedItemReport(this.model.id).subscribe(function (result) {
            _this.summaryData = result.content;
            _this.updateGaugeData();
            _this.updateBarData();
        });
    };
    SurveyFeedItemReport.prototype.getResultListData = function () {
    };
    SurveyFeedItemReport.prototype.updateGaugeData = function () {
        var gaugeData = new GaugeChartData({
            height: 150,
            showTooltip: true,
            chartData: [
                {
                    name: 'Submitted',
                    colour: '#9F378E',
                    data: (this.summaryData.passed / this.summaryData.submitted) * 100
                }
            ]
        });
        this.submissionRateData = gaugeData;
    };
    SurveyFeedItemReport.prototype.updateBarData = function () {
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
            width: 500,
            showTooltip: true,
            showYAxis: false,
            showXAxis: true,
            chartData: [{
                    name: 's',
                    colour: '#9F378E',
                    data: dates
                }]
        });
        this.averageTimeData = barData;
    };
    SurveyFeedItemReport.prototype.goBack = function () {
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    };
    return SurveyFeedItemReport;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SurveyFeedItemReport.prototype, "onBackEvent", void 0);
SurveyFeedItemReport = __decorate([
    core_1.Component({
        selector: 'surveyfeeditemreport',
        template: require('./surveyfeeditemreport.component.html'),
        styles: [require('./quizfeeditemreport.component.css'), require('./surveyfeeditemreport.component.css')]
    }),
    __metadata("design:paramtypes", [ShareService, FeedDataService,
        core_1.Injector])
], SurveyFeedItemReport);
exports.SurveyFeedItemReport = SurveyFeedItemReport;
//# sourceMappingURL=surveyfeeditemreport.component.js.map
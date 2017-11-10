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
var feeddataservice_1 = require("../../services/feeddataservice");
var Date1 = require("../../classes/helpers/date");
var DateEx = Date1.DateEx;
var Angular2_csv_1 = require("angular2-csv/Angular2-csv");
var reportclasses_1 = require("../../models/reportclasses");
var SurveyFeedItemReport = (function () {
    function SurveyFeedItemReport(sharedService, feedDataService, injector) {
        var _this = this;
        this.sharedService = sharedService;
        this.feedDataService = feedDataService;
        this.injector = injector;
        this.feedTypes = Enums.FeedTypeEnum;
        this.listData = [];
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
        this.backSub = this.sharedService.goBackEvent.subscribe(function () {
            _this.onBackEvent.emit();
        });
    }
    SurveyFeedItemReport.prototype.ngOnInit = function () {
        this.getData();
    };
    SurveyFeedItemReport.prototype.ngAfterViewInit = function () {
    };
    SurveyFeedItemReport.prototype.ngOnDestroy = function () {
        if (this.backSub)
            this.backSub.unsubscribe();
    };
    SurveyFeedItemReport.prototype.getData = function () {
        var _this = this;
        this.feedDataService.getSurveyFeedSummaries(this.model.id).subscribe(function (result) {
            if (result.content) {
                _this.summaryData = new reportclasses_1.ObservationItemSummary(result.content);
                _this.updateGaugeData();
                _this.updateBarData();
            }
            else
                _this.summaryData = new reportclasses_1.ObservationItemSummary();
            _this.updateGaugeData();
            _this.updateBarData();
            _this.updateListData();
        });
    };
    SurveyFeedItemReport.prototype.updateGaugeData = function () {
        //var gaugeData = new GaugeChartData({
        //    height: 150,
        //    showTooltip: true,
        //    chartData: [
        //        {
        //            name: 'Submitted',
        //            colour: '#9F378E',
        //            data: (this.summaryData.submitted / this.summaryData.totalRecipents) * 100
        //        }
        //    ]
        //});
        this.submissionRateData = (this.summaryData.submitted / this.summaryData.totalRecipents) * 100;
    };
    SurveyFeedItemReport.prototype.updateBarData = function () {
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
        //let dates: { x: string, y: number }[] = [];
        //for (let submission in this.summaryData.submissions) {
        //    let formatted = DateEx.formatDate(new Date(submission), "dd/MM");
        //    let existing = dates.find(x => x.x === formatted);
        //    if (existing) {
        //        dates.splice(dates.indexOf(existing), 1, { x: formatted, y: existing.y + 1 });
        //    } else {
        //        dates.push({ x: formatted, y: 1 });
        //    }
        //}
        //if (dates.length == 0) {
        //    dates.push({ x: "11/07", y: 2 });
        //    dates.push({ x: "12/07", y: 4 });
        //}
        //var barData = new BarChartData({
        //    width: 500,
        //    showTooltip: true,
        //    showYAxis: false,
        //    showXAxis: true,
        //    chartData: [{
        //        name: 'Allocated time (days)',
        //        colour: '#9F378E',
        //        data: dates
        //    }]
        //});
        //this.averageTimeData = barData;
    };
    SurveyFeedItemReport.prototype.updateListData = function () {
        var _this = this;
        this.listData = [];
        if (this.model && this.summaryData && this.summaryData.surveyFeedResults) {
            var _loop_2 = function (question) {
                data = [];
                question.answers.forEach(function (x) {
                    try {
                        data.push({
                            percent: _this.summaryData.surveyFeedResults.find(function (y) { return y.surveyQuestionId == question.id; }).surveyAnswerSummaries.find(function (y) { return y.surverQuestionAnwerId == x.id; }).percentage,
                            label: x.answer
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                });
                this_1.listData.push({
                    title: question.question,
                    data: data
                });
            };
            var this_1 = this, data;
            for (var _i = 0, _a = this.model.questions; _i < _a.length; _i++) {
                var question = _a[_i];
                _loop_2(question);
            }
            ;
        }
    };
    SurveyFeedItemReport.prototype.handleReport = function () {
        var report = [{ 'title': 'Question', 'question': 'Answer', 'percent': 'Percent' }];
        for (var i = 0; i < this.listData.length; i++) {
            for (var i2 = 0; i2 < this.listData[i].data.length; i2++) {
                report.push({
                    title: this.listData[i].title,
                    question: this.listData[i].data[i2].label,
                    percent: this.listData[i].data[i2].percent
                });
            }
        }
        new Angular2_csv_1.Angular2Csv(report, this.model.title + DateEx.formatDate(new Date()));
    };
    SurveyFeedItemReport.prototype.goBack = function () {
        this.pageTitle = null;
        this.model = null;
        this.backSub.unsubscribe();
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
    __metadata("design:paramtypes", [ShareService, feeddataservice_1.FeedDataService,
        core_1.Injector])
], SurveyFeedItemReport);
exports.SurveyFeedItemReport = SurveyFeedItemReport;
//# sourceMappingURL=surveyfeeditemreport.component.js.map
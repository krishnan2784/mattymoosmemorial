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
var Date1 = require("../../classes/helpers/date");
var DateEx = Date1.DateEx;
var Angular2_csv_1 = require("angular2-csv/Angular2-csv");
var reportclasses_1 = require("../../models/reportclasses");
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
        this.feedDataService.getObservationFeedSummaries(this.model.id).subscribe(function (result) {
            if (result.content) {
                _this.summaryData = new reportclasses_1.ObservationItemSummary(result.content);
                _this.updateGaugeData();
                _this.updateBarData();
                _this.updateListData();
            }
            else
                _this.summaryData = new reportclasses_1.ObservationItemSummary();
            _this.updateGaugeData();
            _this.updateBarData();
            _this.updateListData();
        });
    };
    ObservationFeedItemReport.prototype.updateGaugeData = function () {
        this.submissionRateData = (this.summaryData.submitted / this.summaryData.totalRecipents) * 100;
    };
    ObservationFeedItemReport.prototype.updateBarData = function () {
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
    ObservationFeedItemReport.prototype.updateListData = function () {
        var _this = this;
        if (this.model && this.summaryData && this.summaryData.surveyFeedResults) {
            console.log(this.summaryData.surveyFeedResults);
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
    ObservationFeedItemReport.prototype.handleReport = function () {
        new Angular2_csv_1.Angular2Csv(this.summaryData, this.model.title + DateEx.formatDate(new Date()));
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
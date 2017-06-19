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
var Datashareservice = require("../../dataservices/datashareservice");
var ShareService = Datashareservice.ShareService;
var Enums = require("../../enums");
var Feeddataservice = require("../../dataservices/feeddataservice");
var FeedDataService = Feeddataservice.FeedDataService;
var Chartclasses = require("../../models/chartclasses");
var BarChartData = Chartclasses.BarChartData;
var GaugeChartData = Chartclasses.GaugeChartData;
var DonutChartData = Chartclasses.DonutChartData;
var Reportclasses = require("../../models/reportclasses");
var FeedItemSummary = Reportclasses.FeedItemSummary;
var FeedItemReport = (function () {
    function FeedItemReport(sharedService, feedDataService, injector) {
        var _this = this;
        this.sharedService = sharedService;
        this.feedDataService = feedDataService;
        this.injector = injector;
        this.feedTypes = Enums.FeedTypeEnum;
        this.totalLearners = 100;
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
        this.sharedService.goBackEvent.subscribe(function () {
            _this.onBackEvent.emit();
        });
    }
    FeedItemReport.prototype.ngOnInit = function () {
        this.getData();
    };
    FeedItemReport.prototype.getData = function () {
        var _this = this;
        this.feedDataService.getFeedItemReport(this.model.id).subscribe(function (result) {
            if (result.success) {
                //this.reportData = new FeedItemSummary(result.content);
                _this.reportData = new FeedItemSummary({});
                _this.updateReport();
            }
            else {
                Materialize.toast(result.message, 5000, 'red');
                _this.goBack();
            }
        });
    };
    FeedItemReport.prototype.updateReport = function () {
        //if (this.reportData) {
        //    this.averageTimeData = new BarChartData();
        //}
        var barData = new BarChartData({});
        this.averageTimeData = barData;
        var gaugeData = new GaugeChartData({
            height: 150,
            chartData: [
                {
                    name: 'Passed',
                    colour: '#9F378E',
                    data: (this.reportData.passed / this.reportData.submitted) * 100
                }
            ]
        });
        this.passRatioData = gaugeData;
        var donutData = new DonutChartData({
            chartData: [
                {
                    name: 'Pass',
                    colour: '#9F378E',
                    data: [this.reportData.averageScore]
                }, {
                    name: 'Fail',
                    colour: '#ECECEC',
                    data: [100 - this.reportData.averageScore]
                }
            ]
        });
        this.averageScoreData = donutData;
    };
    FeedItemReport.prototype.goBack = function () {
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
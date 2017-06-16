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
var Basecomponent = require("../base.component");
var BaseComponent = Basecomponent.BaseComponent;
var Datashareservice = require("../../dataservices/datashareservice");
var ShareService = Datashareservice.ShareService;
var Enums = require("../../enums");
var Feeddataservice = require("../../dataservices/feeddataservice");
var FeedDataService = Feeddataservice.FeedDataService;
var Chartclasses = require("../../models/chartclasses");
var BarChartData = Chartclasses.BarChartData;
var GaugeChartData = Chartclasses.GaugeChartData;
var FeedItemReport = (function (_super) {
    __extends(FeedItemReport, _super);
    function FeedItemReport(sharedService, feedDataService, injector) {
        var _this = _super.call(this, sharedService, '', false) || this;
        _this.feedDataService = feedDataService;
        _this.injector = injector;
        _this.feedTypes = Enums.FeedTypeEnum;
        _this.totalLearners = 100;
        _this.passRatioData = new GaugeChartData({});
        _this.averageTimeData = new BarChartData();
        _this.model = _this.injector.get('model');
        _this.pageTitle = _this.injector.get('pageTitle');
        return _this;
    }
    FeedItemReport.prototype.ngOnInit = function () {
        if (!this.pageTitle || this.pageTitle === '')
            this.pageTitle = Enums.FeedTypeEnum[this.model.feedType] + ' Analytics Reports';
        this.updatePageTitle(this.pageTitle);
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
        this.getData();
    };
    FeedItemReport.prototype.getData = function () {
        var _this = this;
        this.feedDataService.getFeedItemReport(this.model.id).subscribe(function (result) {
            if (result.success) {
                _this.reportData = result.content;
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
        var gaugeData = new GaugeChartData({});
        this.passRatioData = gaugeData;
    };
    FeedItemReport.prototype.goBack = function () {
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    };
    return FeedItemReport;
}(BaseComponent));
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
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
var Feeddataservice = require("../../dataservices/feeddataservice");
var FeedDataService = Feeddataservice.FeedDataService;
var Chartclasses = require("../../models/chartclasses");
var BarChartData = Chartclasses.BarChartData;
var FeedItemReport = (function (_super) {
    __extends(FeedItemReport, _super);
    function FeedItemReport(sharedService, feedDataService) {
        var _this = _super.call(this, sharedService, '', false) || this;
        _this.feedDataService = feedDataService;
        return _this;
    }
    FeedItemReport.prototype.ngOnInit = function () {
        if (!this.pageTitle)
            this.pageTitle = this.model.feedType.toString() + ' Analytics Reports';
        this.updatePageTitle(this.pageTitle);
        this.feedCatString = this.model.feedCategory.toString();
        this.getData();
    };
    FeedItemReport.prototype.getData = function () {
        var _this = this;
        this.feedDataService.getFeedItemReport(this.model.id).subscribe(function (result) {
            _this.reportData = result.content;
            _this.updateReport();
            //if (result.success) {
            //    this.reportData = result.content;
            //    this.updateReport();
            //} else {
            //    Materialize.toast(result.message, 5000, 'red');
            //    this.goBack();
            //}
        });
    };
    FeedItemReport.prototype.updateReport = function () {
        this.averageTimeData = new BarChartData();
        //if (this.reportData) {
        //    this.averageTimeData = new BarChartData();
        //}
    };
    FeedItemReport.prototype.goBack = function () {
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
    };
    return FeedItemReport;
}(BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FeedItemReport.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FeedItemReport.prototype, "pageTitle", void 0);
FeedItemReport = __decorate([
    core_1.Component({
        selector: 'feeditemreport',
        template: require('./feeditemreport.component.html'),
        styles: [require('./feeditemreport.component.css')]
    }),
    __metadata("design:paramtypes", [ShareService, FeedDataService])
], FeedItemReport);
exports.FeedItemReport = FeedItemReport;
//# sourceMappingURL=feeditemreport.component.js.map
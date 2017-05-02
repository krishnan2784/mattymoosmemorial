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
var core_1 = require("@angular/core");
var feeddataservice_1 = require("../../dataservices/feeddataservice");
var marketdataservice_1 = require("../../dataservices/marketdataservice");
var datashareservice_1 = require("../../dataservices/datashareservice");
var userdataservice_1 = require("../../dataservices/userdataservice");
var AppComponent = (function () {
    function AppComponent(sharedService) {
        var _this = this;
        this.sharedService = sharedService;
        sharedService.pageTitleUpdated.subscribe(function (pageTitle) {
            _this.setPageTitle(pageTitle);
        });
        sharedService.marketDropdownVisibilitypeUpdated.subscribe(function (isVisible) {
            _this.setMarketDropdownVisibility(isVisible);
        });
    }
    AppComponent.prototype.setPageTitle = function (value) {
        this.pageTitle = value;
    };
    AppComponent.prototype.setMarketDropdownVisibility = function (value) {
        this.marketDropdownIsVisible = value;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        template: require('./app.component.html'),
        styles: [require('./app.component.css')],
        providers: [feeddataservice_1.FeedDataService, marketdataservice_1.MarketDataService, datashareservice_1.ShareService, userdataservice_1.UserDataService]
    }),
    __metadata("design:paramtypes", [datashareservice_1.ShareService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
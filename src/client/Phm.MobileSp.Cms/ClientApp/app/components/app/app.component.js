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
var feeddataservice_1 = require("../../services/feeddataservice");
var marketdataservice_1 = require("../../services/marketdataservice");
var shareservice_1 = require("../../services/helpers/shareservice");
var userdataservice_1 = require("../../services/userdataservice");
var Mediaservice = require("../../services/mediaservice");
var MediaDataService = Mediaservice.MediaDataService;
var brandingservice_1 = require("../../services/brandingservice");
var competitionsdataservice_1 = require("../../services/competitionsdataservice");
var termsandconditionsdataservice_1 = require("../../services/termsandconditionsdataservice");
var rewardschemedataservice_1 = require("../../services/rewardschemedataservice");
var activecompetitionsdataservice_1 = require("../../services/activecompetitionsdataservice");
var AppComponent = (function () {
    function AppComponent(sharedService) {
        var _this = this;
        this.sharedService = sharedService;
        this.appTheme = '';
        sharedService.appThemeUpdated.subscribe(function (appTheme) {
            _this.setAppTheme(appTheme);
        });
        sharedService.pageTitleUpdated.subscribe(function (pageTitle) {
            _this.setPageTitle(pageTitle);
        });
        sharedService.backButtonUpdated.subscribe(function (backText) {
            _this.setBackText(backText);
        });
        sharedService.marketDropdownVisibilitypeUpdated.subscribe(function (isVisible) {
            _this.setMarketDropdownVisibility(isVisible);
        });
    }
    AppComponent.prototype.setPageTitle = function (value) {
        this.pageTitle = value;
    };
    AppComponent.prototype.setBackText = function (value) {
        this.backButtonText = value;
    };
    AppComponent.prototype.setMarketDropdownVisibility = function (value) {
        this.marketDropdownIsVisible = value;
    };
    AppComponent.prototype.setAppTheme = function (value) {
        this.appTheme = value;
    };
    AppComponent.prototype.goBack = function () {
        this.sharedService.goBackEvent.emit();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        template: require('./app.component.html'),
        styles: [require('./app.component.css')],
        providers: [feeddataservice_1.FeedDataService, marketdataservice_1.MarketDataService,
            shareservice_1.ShareService, userdataservice_1.UserDataService,
            MediaDataService, brandingservice_1.BrandingService,
            competitionsdataservice_1.CompetitionsDataService, termsandconditionsdataservice_1.TermsAndConditionsDataService,
            rewardschemedataservice_1.RewardSchemesDataService, activecompetitionsdataservice_1.ActiveCompetitionsDataService]
    }),
    __metadata("design:paramtypes", [shareservice_1.ShareService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
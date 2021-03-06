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
var Subject_1 = require("rxjs/Subject");
var Userclasses = require("../../models/userclasses");
var UserMarket = Userclasses.UserMarket;
var userdataservice_1 = require("../userdataservice");
var userclasses_1 = require("../../models/userclasses");
var entitypermissiondataservice_1 = require("../entitypermissiondataservice");
var ShareService = (function () {
    function ShareService(userDataService, entityPermissionDataService) {
        var _this = this;
        this.userDataService = userDataService;
        this.entityPermissionDataService = entityPermissionDataService;
        this.currentUser = new userclasses_1.User();
        this.currentMarket = new UserMarket;
        this.currentMarketId = this.currentMarket.id;
        this.pageTitleUpdate = new Subject_1.Subject();
        this.pageTitleUpdated = this.pageTitleUpdate.asObservable();
        this.appThemeUpdate = new Subject_1.Subject();
        this.appThemeUpdated = this.appThemeUpdate.asObservable();
        this.backButtonUpdate = new Subject_1.Subject();
        this.backButtonUpdated = this.backButtonUpdate.asObservable();
        this.marketDropdownVisibilitypeUpdate = new Subject_1.Subject();
        this.marketDropdownVisibilitypeUpdated = this.marketDropdownVisibilitypeUpdate.asObservable();
        this.marketDropdownEnabledUpdate = new Subject_1.Subject();
        this.marketDropdownEnabledUpdated = this.marketDropdownEnabledUpdate.asObservable();
        this.marketUpdate = new Subject_1.Subject();
        this.marketUpdated = this.marketUpdate.asObservable();
        this.feedItemUpdate = new Subject_1.Subject();
        this.feedItemUpdated = this.feedItemUpdate.asObservable();
        this.goBackEvent = new core_1.EventEmitter();
        this.tabNavUpdate = new Subject_1.Subject();
        this.navTabsUpdated = this.tabNavUpdate.asObservable();
        this.mainNavUpdate = new Subject_1.Subject();
        this.mainNavUpdated = this.mainNavUpdate.asObservable();
        this.permissionsUpdate = new Subject_1.Subject();
        this.permissionsUpdated = this.permissionsUpdate.asObservable();
        userDataService.getCurrentUser().subscribe(function (response) {
            _this.currentUser = response;
        });
    }
    ShareService.prototype.updatePageTitle = function (pageTitle) {
        this.pageTitleUpdate.next(pageTitle);
    };
    ShareService.prototype.updateAppTheme = function (appTheme) {
        this.appThemeUpdate.next(appTheme);
    };
    ShareService.prototype.updateBackButton = function (backText) {
        this.backButtonUpdate.next(backText);
    };
    ShareService.prototype.updateMarketDropdownVisibility = function (isMarketDropdownVisible) {
        this.marketDropdownVisibilitypeUpdate.next(isMarketDropdownVisible);
    };
    ShareService.prototype.updateMarketDropdownEnabledState = function (isMarketDropdownEnabled) {
        this.marketDropdownEnabledUpdate.next(isMarketDropdownEnabled);
    };
    ShareService.prototype.updateMarket = function (market) {
        if (this.currentMarket && this.currentMarket.id === market.id)
            return;
        this.currentMarket = market;
        this.marketUpdate.next(market);
    };
    ShareService.prototype.updateFeedItem = function (feedItem) {
        this.feedItemUpdate.next(feedItem);
    };
    ShareService.prototype.goBack = function () {
        this.goBackEvent.emit();
    };
    ShareService.prototype.updateNavTabs = function (navItems) {
        this.tabNavUpdate.next(navItems);
    };
    ShareService.prototype.updateMainNavMenu = function (navItems, backText, overwriteBase) {
        if (backText === void 0) { backText = null; }
        if (overwriteBase === void 0) { overwriteBase = false; }
        this.mainNavUpdate.next([navItems, backText, overwriteBase]);
    };
    ShareService.prototype.emitPermissionsUpdateNotification = function () {
        this.permissionsUpdate.next(true);
    };
    return ShareService;
}());
ShareService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [userdataservice_1.UserDataService, entitypermissiondataservice_1.EntityPermissionDataService])
], ShareService);
exports.ShareService = ShareService;
//# sourceMappingURL=shareservice.js.map
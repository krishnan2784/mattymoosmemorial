"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var Userclasses = require("../models/userclasses");
var UserMarket = Userclasses.UserMarket;
var ShareService = (function () {
    function ShareService() {
        this.currentMarket = new UserMarket;
        this.currentMarketId = this.currentMarket.id;
        this.pageTitleUpdate = new Subject_1.Subject();
        this.pageTitleUpdated = this.pageTitleUpdate.asObservable();
        this.marketDropdownVisibilitypeUpdate = new Subject_1.Subject();
        this.marketDropdownVisibilitypeUpdated = this.marketDropdownVisibilitypeUpdate.asObservable();
        this.marketUpdate = new Subject_1.Subject();
        this.marketUpdated = this.marketUpdate.asObservable();
        this.feedItemUpdate = new Subject_1.Subject();
        this.feedItemUpdated = this.feedItemUpdate.asObservable();
    }
    ShareService.prototype.updatePageTitle = function (pageTitle) {
        this.pageTitleUpdate.next(pageTitle);
    };
    ShareService.prototype.updateMarketDropdownVisibility = function (isMarketDropdownVisible) {
        this.marketDropdownVisibilitypeUpdate.next(isMarketDropdownVisible);
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
    return ShareService;
}());
ShareService = __decorate([
    core_1.Injectable()
], ShareService);
exports.ShareService = ShareService;
//# sourceMappingURL=datashareservice.js.map
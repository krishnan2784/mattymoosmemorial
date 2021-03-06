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
var marketdataservice_1 = require("../../services/marketdataservice");
var shareservice_1 = require("../../services/helpers/shareservice");
var userdataservice_1 = require("../../services/userdataservice");
var MarketDropdown = (function () {
    function MarketDropdown(marketDataService, userDataService, sharedService) {
        var _this = this;
        this.marketDataService = marketDataService;
        this.userDataService = userDataService;
        this.sharedService = sharedService;
        this.marketUpdated = new core_1.EventEmitter();
        this.userMarkets = [];
        this.enabled = true;
        this.userDataService.getUserMarkets().subscribe(function (result) {
            _this.userMarkets = result;
            _this.setCurrentMarketId();
        });
        this.sharedService.marketDropdownEnabledUpdated.subscribe(function (enabled) {
            _this.enabled = enabled;
        });
    }
    MarketDropdown.prototype.ngAfterViewInit = function () {
    };
    MarketDropdown.prototype.setCurrentMarketId = function () {
        var _this = this;
        this.marketDataService.getCurrentMarketId().subscribe(function (result) {
            if (_this.userMarkets != null) {
                _this.currentMarket = _this.userMarkets.find(function (x) { return x.id === result; });
                _this.sharedService.updateMarket(_this.currentMarket);
            }
        });
    };
    MarketDropdown.prototype.updateCurrentMarket = function (newMarket) {
        var _this = this;
        this.marketDataService.updateCurrentMarketId(this.currentMarket.id).subscribe(function (result) {
            if (result && _this.userMarkets != null) {
                _this.currentMarket = _this.userMarkets.find(function (x) { return x.id === newMarket.id; });
                _this.sharedService.updateMarket(_this.currentMarket);
            }
        });
    };
    return MarketDropdown;
}());
MarketDropdown = __decorate([
    core_1.Injectable(),
    core_1.Component({
        selector: 'marketdropdown',
        template: require('./marketdropdown.component.html'),
        styles: [require('./marketdropdown.component.css')]
    }),
    __metadata("design:paramtypes", [marketdataservice_1.MarketDataService, userdataservice_1.UserDataService,
        shareservice_1.ShareService])
], MarketDropdown);
exports.MarketDropdown = MarketDropdown;
//# sourceMappingURL=marketdropdown.component.js.map
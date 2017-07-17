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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/publishReplay");
var responsehelper_1 = require("./helpers/responsehelper");
var Requesthelper = require("./helpers/requesthelper");
var RequestHelper = Requesthelper.RequestHelper;
var MarketDataService = (function (_super) {
    __extends(MarketDataService, _super);
    function MarketDataService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        return _this;
    }
    MarketDataService.prototype.updateCurrentMarketId = function (marketId) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.http.get('/api/Market/ChangeMarket?marketId=' + marketId).subscribe(function (result) {
                var response = responsehelper_1.ResponseHelper.getResponse(result);
                observer.next(response.success);
                observer.complete();
            });
        });
    };
    MarketDataService.prototype.getCurrentMarketId = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.http.get('/api/Market/GetCurrentMarketId').subscribe(function (result) {
                var response = responsehelper_1.ResponseHelper.getResponse(result);
                observer.next(response.content);
                observer.complete();
            });
        });
    };
    MarketDataService.prototype.getMarketsByMasterId = function (contentType, masterId) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.getRequestBase('/api/Market/GetMarketsByMasterId?contentType=' + contentType
                + '&masterId=' + masterId).subscribe(function (result) {
                observer.next(result);
                observer.complete();
            });
        });
    };
    MarketDataService.prototype.getMarketUserFilters = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.getRequestBase('/api/Market/GetMarketUserFilters').subscribe(function (result) {
                if (result) {
                    var response = {
                        userGroupNames: result.userGroupNames,
                        dealershipNames: result.dealershipNames,
                        dealershipCodes: result.dealershipCodes,
                        regions: result.regions,
                        zones: result.zones,
                        areas: result.areas
                    };
                    observer.next(response);
                }
                observer.complete();
            });
        });
    };
    return MarketDataService;
}(RequestHelper));
MarketDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MarketDataService);
exports.MarketDataService = MarketDataService;
//# sourceMappingURL=marketdataservice.js.map
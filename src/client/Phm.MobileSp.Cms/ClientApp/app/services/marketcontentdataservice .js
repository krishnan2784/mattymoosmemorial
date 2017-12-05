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
var Enums = require("../enums");
var CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
var Requesthelper = require("./helpers/requesthelper");
var RequestHelper = Requesthelper.RequestHelper;
var MarketContentDataService = (function (_super) {
    __extends(MarketContentDataService, _super);
    function MarketContentDataService(http, contentType, baseUrl, getMarketsByContentIdUrl, copyContentToMarketUrl) {
        if (getMarketsByContentIdUrl === void 0) { getMarketsByContentIdUrl = '/GetMarketsById'; }
        if (copyContentToMarketUrl === void 0) { copyContentToMarketUrl = '/CopyToMarket'; }
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.getMarketsByContentIdUrl = getMarketsByContentIdUrl;
        _this.copyContentToMarketUrl = copyContentToMarketUrl;
        _this.contentType = contentType;
        _this.baseUrl = '/api/' + baseUrl;
        _this.getMarketsByContentIdUrl = _this.baseUrl + getMarketsByContentIdUrl;
        _this.copyContentToMarketUrl = _this.baseUrl + copyContentToMarketUrl;
        return _this;
    }
    MarketContentDataService.prototype.getMarketsByContentId = function (contentId) {
        var url = this.getMarketsByContentIdUrl + '?contentId=' + contentId;
        return this.getRequestBase(url);
    };
    MarketContentDataService.prototype.copyContentToMarket = function (id, marketIds) {
        var _this = this;
        if (!marketIds || marketIds.length === 0)
            return null;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var marketQueryString = '';
        for (var _i = 0, marketIds_1 = marketIds; _i < marketIds_1.length; _i++) {
            var m = marketIds_1[_i];
            marketQueryString += '&marketIds=' + m;
        }
        return Observable_1.Observable.create(function (observer) {
            _this.http.post(_this.copyContentToMarketUrl + '?id=' + id + marketQueryString, null, headers).subscribe(function (result) {
                var response = responsehelper_1.ResponseHelper.getResponse(result);
                if (response.success) {
                    Materialize.toast(response.message, 5000, 'green');
                }
                else {
                    Materialize.toast(response.message, 5000, 'red');
                }
                observer.next(response);
                observer.complete();
            });
        });
    };
    MarketContentDataService.prototype.publishContentToLive = function (contentId) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var url = this.baseUrl + "/PublishContentToLive";
        return Observable_1.Observable.create(function (observer) {
            _this.http.post(url + '?contentId=' + contentId, null, headers).subscribe(function (result) {
                var response = responsehelper_1.ResponseHelper.getResponse(result);
                if (response.success) {
                    Materialize.toast(response.message, 5000, 'green');
                }
                else {
                    Materialize.toast(response.message, 5000, 'red');
                }
                observer.next(response);
                observer.complete();
            });
        });
    };
    return MarketContentDataService;
}(RequestHelper));
MarketContentDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, Number, String, String, String])
], MarketContentDataService);
exports.MarketContentDataService = MarketContentDataService;
//# sourceMappingURL=marketcontentdataservice .js.map
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
var requesthelper_1 = require("./helpers/requesthelper");
var Enums = require("../enums");
var CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
var FeedDataService = (function (_super) {
    __extends(FeedDataService, _super);
    function FeedDataService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        return _this;
    }
    FeedDataService.prototype.getFeeditems = function () {
        return this.getRequestBase('/api/Feed/GetFeedItems');
    };
    FeedDataService.prototype.getFeeditemsByCat = function (selectedCat) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.getFeeditems().subscribe(function (result) {
                if (result.length) {
                    var response = result.filter(function (x) { return x.feedCategory === selectedCat; });
                    observer.next(response);
                }
                observer.complete();
            });
        });
    };
    FeedDataService.prototype.getFeeditemsByType = function (selectedType) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.getFeeditems().subscribe(function (result) {
                if (result.length) {
                    var response = result.filter(function (x) { return x.feedType === selectedType; });
                    observer.next(response);
                }
                observer.complete();
            });
        });
    };
    FeedDataService.prototype.getFeeditem = function (feedId) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.getRequestBase('/api/Feed/GetFeedItem?id=' + feedId).subscribe(function (result) {
                observer.next(result);
                observer.complete();
            });
        });
    };
    FeedDataService.prototype.updateFeeditem = function (updateUrl, feedItem) {
        return this.postRequestFull(updateUrl, feedItem);
    };
    FeedDataService.prototype.deleteFeeditem = function (feedItemId) {
        return this.postRequestBase('/api/Feed/DeleteFeedItem', feedItemId);
    };
    FeedDataService.prototype.copyItemToMarket = function (id, marketIds) {
        return this.copyToMarket('/api/Feed/CopyFeedItemToMarket', id, marketIds);
    };
    FeedDataService.prototype.publishContentToLive = function (contentId) {
        return this.publishToLive(CopiedElementTypeEnum.Feed, contentId);
    };
    return FeedDataService;
}(requesthelper_1.RequestHelper));
FeedDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FeedDataService);
exports.FeedDataService = FeedDataService;
//# sourceMappingURL=feeddataservice.js.map
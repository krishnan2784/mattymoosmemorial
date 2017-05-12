"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/publishReplay");
var requesthelper_1 = require("./helpers/requesthelper");
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
    FeedDataService.prototype.getFeeditem = function (feedId, feedItemType) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.getRequestBase('/api/Feed/GetFeedItem', [{ key: 'id', value: feedId }]).subscribe(function (result) {
                var feedItem = new feedItemType(result.content);
                observer.next(feedItem);
                observer.complete();
            });
        });
    };
    FeedDataService.prototype.updateFeeditem = function (updateUrl, feedItem) {
        return this.postRequestFull(updateUrl, feedItem);
    };
    FeedDataService.prototype.deleteFeeditem = function (feedItem) {
        this.http.get('/api/Feed/DeleteFeedItem?id=' + feedItem.id).subscribe(function (result) {
            return true;
        });
        return false;
    };
    FeedDataService.prototype.copyFeedItemToMarket = function (feedItem, marketIds) {
        return this.postRequestFull('/api/Feed/CopyFeedItemToMarket', { feedItemId: feedItem.id, marketIds: marketIds });
    };
    return FeedDataService;
}(requesthelper_1.RequestHelper));
FeedDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FeedDataService);
exports.FeedDataService = FeedDataService;
//# sourceMappingURL=feeddataservice.js.map
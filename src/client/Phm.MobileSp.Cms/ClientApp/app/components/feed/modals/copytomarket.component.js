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
var Basemodalcontentcomponent = require("../../modals/basemodalcontent.component");
var BaseModalContent = Basemodalcontentcomponent.BaseModalContent;
var Datashareservice = require("../../../services/helpers/shareservice");
var ShareService = Datashareservice.ShareService;
var Marketdataservice = require("../../../services/marketdataservice");
var MarketDataService = Marketdataservice.MarketDataService;
var Userclasses = require("../../../models/userclasses");
var Userdataservice = require("../../../services/userdataservice");
var UserDataService = Userdataservice.UserDataService;
var ContentMarket = Userclasses.ContentMarket;
var FeedItemCopyToMarket = (function (_super) {
    __extends(FeedItemCopyToMarket, _super);
    function FeedItemCopyToMarket(injector, sharedService, marketService, userDataService) {
        var _this = _super.call(this) || this;
        _this.injector = injector;
        _this.sharedService = sharedService;
        _this.marketService = marketService;
        _this.userDataService = userDataService;
        _this.userMarkets = [];
        _this.currentMarkets = [];
        _this.unsavedChanges = false;
        _this.loading = false;
        if (injector) {
            _this.model = injector.get('model');
            _this.contentType = injector.get('contentType');
            _this.marketContentService = injector.get('marketContentService');
        }
        return _this;
    }
    FeedItemCopyToMarket.prototype.ngOnInit = function () {
        this.setupMarkets();
    };
    FeedItemCopyToMarket.prototype.setupMarkets = function () {
        var _this = this;
        this.marketService.getMarketsByMasterId(this.contentType, this.model.masterId).subscribe(function (result) {
            if (result && result.length > 0) {
                _this.currentMarkets = _this.filterMarkets(result.map(function (x) { return new ContentMarket(x); }));
                _this.markMarketsAsCopied();
            }
            _this.userDataService.getUserMarkets().subscribe(function (result) {
                if (result && result.length > 0) {
                    if (_this.currentMarkets && _this.currentMarkets.length > 0)
                        result = result.filter(function (x) { return _this.currentMarkets.filter(function (y) { return y.id === x.id; }).length === 0; });
                    result = result.filter(function (x) { return !x.isLive; });
                    _this.userMarkets = _this.filterMarkets(result.map(function (x) { return new ContentMarket(x); }));
                }
            });
        });
    };
    FeedItemCopyToMarket.prototype.filterMarkets = function (markets) {
        var _this = this;
        // we will need to filter Global and Pan EU out when viewing the Pan EU market
        // and filter out Global when viewing the global market
        // we could add a market level integer to the market (e.g. 0 = global, 1 = regional, 2 = market)
        // or we could add an isGlobal flag
        if (this.sharedService.currentMarket.isMaster) {
            // markets = markets.filter(x => !x.isMaster);
        }
        markets = markets.filter(function (x) { return x.id !== _this.sharedService.currentMarket.id; });
        return markets;
    };
    FeedItemCopyToMarket.prototype.markMarketsAsCopied = function () {
        var _loop_1 = function (x) {
            var origItem = this_1.currentMarkets.find(function (y) { return y.id === x.id; });
            var index = this_1.currentMarkets.indexOf(origItem);
            this_1.currentMarkets[index].isCopied = true;
        };
        var this_1 = this;
        for (var _i = 0, _a = this.currentMarkets; _i < _a.length; _i++) {
            var x = _a[_i];
            _loop_1(x);
        }
        this.checkForChanges();
    };
    FeedItemCopyToMarket.prototype.copyToMarket = function () {
        var _this = this;
        if (this.selectedUserMarket[0] && this.currentMarkets.filter(function (x) { return x.id === _this.selectedUserMarket[0].id; }).length === 0) {
            this.currentMarkets.push(new ContentMarket(this.selectedUserMarket[0]));
            var origItem = this.userMarkets.find(function (x) { return x.id === _this.selectedUserMarket[0].id; });
            var index = this.userMarkets.indexOf(origItem);
            this.userMarkets.splice(index, 1);
            this.checkForChanges();
        }
    };
    FeedItemCopyToMarket.prototype.removeFromMarket = function () {
        var _this = this;
        if (this.selectedMarket[0] && !this.selectedMarket[0].isCopied &&
            this.userMarkets.filter(function (x) { return x.id === _this.selectedMarket[0].id; }).length === 0) {
            this.userMarkets.push(new ContentMarket(this.selectedMarket[0]));
            var origItem = this.currentMarkets.find(function (x) { return x.id === _this.selectedMarket[0].id; });
            var index = this.currentMarkets.indexOf(origItem);
            this.currentMarkets.splice(index, 1);
            this.checkForChanges();
        }
    };
    FeedItemCopyToMarket.prototype.checkForChanges = function () { this.unsavedChanges = this.currentMarkets.filter(function (x) { return !x.isCopied; }).length > 0; };
    FeedItemCopyToMarket.prototype.saveChanges = function () {
        var _this = this;
        this.loading = true;
        var marketIds = this.currentMarkets.map(function (x) { return x.id; });
        this.marketContentService.copyItemToMarket(this.model.id, marketIds).subscribe(function (result) {
            if (result.success) {
                _this.closeModal();
            }
            _this.loading = false;
        });
    };
    return FeedItemCopyToMarket;
}(BaseModalContent));
FeedItemCopyToMarket = __decorate([
    core_1.Component({
        selector: 'feeditem-copytomarket',
        template: require('./copytomarket.component.html'),
        styles: [require('./copytomarket.component.css')]
    }),
    __metadata("design:paramtypes", [core_1.Injector, ShareService,
        MarketDataService, UserDataService])
], FeedItemCopyToMarket);
exports.FeedItemCopyToMarket = FeedItemCopyToMarket;
//# sourceMappingURL=copytomarket.component.js.map
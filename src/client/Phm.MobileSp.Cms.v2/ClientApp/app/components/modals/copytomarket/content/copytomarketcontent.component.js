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
var basemodalcontent_component_1 = require("../../basemodalcontent.component");
var enums_1 = require("../../../../enums");
var userclasses_1 = require("../../../../models/userclasses");
var shareservice_1 = require("../../../../services/helpers/shareservice");
var marketdataservice_1 = require("../../../../services/marketdataservice");
var userdataservice_1 = require("../../../../services/userdataservice");
var CopyToMarketContent = (function (_super) {
    __extends(CopyToMarketContent, _super);
    function CopyToMarketContent(injector, sharedService, marketService, userDataService) {
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
    CopyToMarketContent.prototype.ngOnInit = function () {
        this.setupMarkets();
    };
    CopyToMarketContent.prototype.setupMarkets = function () {
        var _this = this;
        var id = this.contentType !== enums_1.CopiedElementTypeEnum.Feed ? this.model.id : this.model.masterId;
        this.marketContentService.getMarketsByContentId(id).subscribe(function (result) {
            if (result && result.length > 0) {
                _this.currentMarkets = _this.filterMarkets(result.map(function (x) { return new userclasses_1.ContentMarket(x); }));
                _this.markMarketsAsCopied();
            }
            _this.userDataService.getUserMarkets().subscribe(function (result) {
                if (result && result.length > 0) {
                    if (_this.currentMarkets && _this.currentMarkets.length > 0)
                        result = result.filter(function (x) { return _this.currentMarkets.filter(function (y) { return y.id === x.id; }).length === 0; });
                    result = result.filter(function (x) { return !x.isLive; });
                    _this.userMarkets = _this.filterMarkets(result.map(function (x) { return new userclasses_1.ContentMarket(x); }));
                }
            });
        });
    };
    CopyToMarketContent.prototype.filterMarkets = function (markets) {
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
    CopyToMarketContent.prototype.markMarketsAsCopied = function () {
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
    CopyToMarketContent.prototype.copyToMarket = function () {
        var _this = this;
        if (this.selectedUserMarket[0] && this.currentMarkets.filter(function (x) { return x.id === _this.selectedUserMarket[0].id; }).length === 0) {
            this.currentMarkets.push(new userclasses_1.ContentMarket(this.selectedUserMarket[0]));
            var origItem = this.userMarkets.find(function (x) { return x.id === _this.selectedUserMarket[0].id; });
            var index = this.userMarkets.indexOf(origItem);
            this.userMarkets.splice(index, 1);
            this.checkForChanges();
        }
    };
    CopyToMarketContent.prototype.removeFromMarket = function () {
        var _this = this;
        if (this.selectedMarket[0] && !this.selectedMarket[0].isCopied &&
            this.userMarkets.filter(function (x) { return x.id === _this.selectedMarket[0].id; }).length === 0) {
            this.userMarkets.push(new userclasses_1.ContentMarket(this.selectedMarket[0]));
            var origItem = this.currentMarkets.find(function (x) { return x.id === _this.selectedMarket[0].id; });
            var index = this.currentMarkets.indexOf(origItem);
            this.currentMarkets.splice(index, 1);
            this.checkForChanges();
        }
    };
    CopyToMarketContent.prototype.checkForChanges = function () { this.unsavedChanges = this.currentMarkets.filter(function (x) { return !x.isCopied; }).length > 0; };
    CopyToMarketContent.prototype.saveChanges = function () {
        var _this = this;
        this.loading = true;
        var marketIds = this.currentMarkets.map(function (x) { return x.id; });
        this.marketContentService.copyContentToMarket(this.model.id, marketIds).subscribe(function (result) {
            if (result.success) {
                _this.closeModal();
            }
            _this.loading = false;
        });
    };
    return CopyToMarketContent;
}(basemodalcontent_component_1.BaseModalContent));
CopyToMarketContent = __decorate([
    core_1.Component({
        selector: 'copytomarketcontent',
        template: require('./copytomarketcontent.component.html'),
        styles: [require('./copytomarketcontent.component.css')]
    }),
    __metadata("design:paramtypes", [core_1.Injector, shareservice_1.ShareService,
        marketdataservice_1.MarketDataService, userdataservice_1.UserDataService])
], CopyToMarketContent);
exports.CopyToMarketContent = CopyToMarketContent;
//# sourceMappingURL=copytomarketcontent.component.js.map
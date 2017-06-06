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
var Datashareservice = require("../../../dataservices/datashareservice");
var ShareService = Datashareservice.ShareService;
var Marketdataservice = require("../../../dataservices/marketdataservice");
var MarketDataService = Marketdataservice.MarketDataService;
var Userdataservice = require("../../../dataservices/userdataservice");
var UserDataService = Userdataservice.UserDataService;
var FeedItemCopyToMarket = (function (_super) {
    __extends(FeedItemCopyToMarket, _super);
    function FeedItemCopyToMarket(injector, sharedService, marketService, userDataService) {
        var _this = _super.call(this) || this;
        _this.injector = injector;
        _this.sharedService = sharedService;
        _this.marketService = marketService;
        _this.userDataService = userDataService;
        if (injector) {
            _this.title = injector.get('title');
            _this.model = injector.get('model');
            _this.contentType = injector.get('contentType');
            _this.copyToMarketService = injector.get('copyToMarketService');
        }
        return _this;
    }
    FeedItemCopyToMarket.prototype.ngOnInit = function () {
        this.setupMarkets();
    };
    FeedItemCopyToMarket.prototype.setupMarkets = function () {
        var _this = this;
        this.marketService.getMarketsByMasterId(this.contentType, this.model.masterId).subscribe(function (result) {
            _this.currentMarkets = result;
            _this.userDataService.getUserMarkets().subscribe(function (result) {
                if (_this.currentMarkets && _this.currentMarkets.length > 0)
                    result = result.filter(function (x) { return _this.currentMarkets.filter(function (y) { return y.id === x.id; }).length === 0; });
                _this.userMarkets = result;
            });
        });
    };
    FeedItemCopyToMarket.prototype.saveChanges = function () {
        //this.sharedService.updateFeedItem(this.model);
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
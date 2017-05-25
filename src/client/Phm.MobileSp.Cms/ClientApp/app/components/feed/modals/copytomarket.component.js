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
var FeedDataService_1 = require("../../../dataservices/FeedDataService");
var Basemodalcontentcomponent = require("../../modals/basemodalcontent.component");
var BaseModalContent = Basemodalcontentcomponent.BaseModalContent;
var Datashareservice = require("../../../dataservices/datashareservice");
var ShareService = Datashareservice.ShareService;
var FeedItemCopyToMarket = (function (_super) {
    __extends(FeedItemCopyToMarket, _super);
    function FeedItemCopyToMarket(injector, feedDataService, sharedService) {
        var _this = _super.call(this) || this;
        _this.injector = injector;
        _this.feedDataService = feedDataService;
        _this.sharedService = sharedService;
        if (injector) {
            _this.model = injector.get('feedItem');
        }
        return _this;
    }
    FeedItemCopyToMarket.prototype.saveChanges = function () {
        this.sharedService.updateFeedItem(this.model);
    };
    return FeedItemCopyToMarket;
}(BaseModalContent));
FeedItemCopyToMarket = __decorate([
    core_1.Component({
        selector: 'feeditem-copytomarket',
        template: require('./copytomarket.component.html'),
        styles: [require('./copytomarket.component.css')],
        providers: [FeedDataService_1.FeedDataService]
    }),
    __metadata("design:paramtypes", [core_1.Injector, FeedDataService_1.FeedDataService, ShareService])
], FeedItemCopyToMarket);
exports.FeedItemCopyToMarket = FeedItemCopyToMarket;
//# sourceMappingURL=copytomarket.component.js.map
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
var router_1 = require("@angular/router");
var Basecomponent = require("../base.component");
var BaseComponent = Basecomponent.BaseComponent;
var Feeddataservice = require("../../services/feeddataservice");
var FeedDataService = Feeddataservice.FeedDataService;
var Shareservice = require("../../services/helpers/shareservice");
var ShareService = Shareservice.ShareService;
var LeaderboardComponent = (function (_super) {
    __extends(LeaderboardComponent, _super);
    function LeaderboardComponent(route, router, feedDataService, sharedService) {
        var _this = _super.call(this, sharedService, 'Leaderboard', true) || this;
        _this.route = route;
        _this.router = router;
        _this.feedDataService = feedDataService;
        return _this;
    }
    LeaderboardComponent.prototype.ngOnInit = function () {
    };
    LeaderboardComponent.prototype.ngOnDestroy = function () {
    };
    LeaderboardComponent.prototype.getData = function () {
    };
    return LeaderboardComponent;
}(BaseComponent));
LeaderboardComponent = __decorate([
    core_1.Component({
        selector: 'leaderboard',
        template: require('./leaderboard.component.html'),
        styles: [require('./leaderboard.component.css')]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        FeedDataService,
        ShareService])
], LeaderboardComponent);
exports.LeaderboardComponent = LeaderboardComponent;
//# sourceMappingURL=leaderboard.component.js.map
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
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var base_component_1 = require("../../../base.component");
var rewardschemedataservice_1 = require("../../../../services/rewardschemedataservice");
var shareservice_1 = require("../../../../services/helpers/shareservice");
var tabnavmenu_component_1 = require("../../../navmenu/tabnavmenu.component");
var competitionclasses_1 = require("../../../../models/competitionclasses");
var RewardSchemeIndexComponent = (function (_super) {
    __extends(RewardSchemeIndexComponent, _super);
    function RewardSchemeIndexComponent(rewardSchemesDataService, sharedService, overlay, vcRef, confirmBox) {
        var _this = _super.call(this, sharedService, 'Reward Schemes', true, '', tabnavmenu_component_1.DefaultTabNavs.competitionsTabs) || this;
        _this.rewardSchemesDataService = rewardSchemesDataService;
        _this.confirmBox = confirmBox;
        _this.selectedModel = null;
        overlay.defaultViewContainer = vcRef;
        _this.setupSubscriptions();
        return _this;
    }
    RewardSchemeIndexComponent.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            _this.updateMarket();
        });
    };
    RewardSchemeIndexComponent.prototype.updateMarket = function () {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.currentMarket = this.sharedService.currentMarket;
        this.rewardSchemes = null;
        this.getData();
    };
    RewardSchemeIndexComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    RewardSchemeIndexComponent.prototype.ngOnDestroy = function () {
        if (this.getRewardScehemesSub)
            this.getRewardScehemesSub.unsubscribe();
    };
    RewardSchemeIndexComponent.prototype.getData = function () {
        var _this = this;
        this.getRewardScehemesSub = this.rewardSchemesDataService.getRewardScheme().subscribe(function (result) {
            _this.rewardSchemes = result;
            _this.sharedService.updateMarketDropdownEnabledState(true);
        });
    };
    RewardSchemeIndexComponent.prototype.updateRewardScheme = function (rewardScheme, remove) {
        if (rewardScheme === void 0) { rewardScheme = null; }
        if (remove === void 0) { remove = false; }
        if (rewardScheme != null && this.rewardSchemes != null) {
            var origRewardScheme = this.rewardSchemes.find(function (x) { return x.id === rewardScheme.id; });
            var index = this.rewardSchemes.indexOf(origRewardScheme);
            if (!remove) {
                if (index > -1) {
                    this.rewardSchemes.splice(index, 1, rewardScheme);
                }
                else {
                    this.rewardSchemes.unshift(rewardScheme);
                }
            }
            else if (index > -1) {
                this.rewardSchemes.splice(index, 1);
            }
        }
    };
    RewardSchemeIndexComponent.prototype.editRewardScheme = function (rewardScheme) {
        if (rewardScheme === void 0) { rewardScheme = new competitionclasses_1.BaseRewardScheme(); }
        if (rewardScheme && rewardScheme.id > 0) {
            this.updatePageTitle("Edit Reward Scheme");
        }
        else {
            this.updatePageTitle("New Reward Scheme");
        }
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();
        this.selectedModel = rewardScheme;
    };
    RewardSchemeIndexComponent.prototype.rewardSchemeUpdated = function (comp) {
        this.updatePageTitle("Reward Schemes");
        this.updateMarketDropdownVisibility(true);
        this.updateTabNavItems(tabnavmenu_component_1.DefaultTabNavs.competitionsTabs);
        this.selectedModel = null;
        if (comp)
            this.getData();
    };
    RewardSchemeIndexComponent.prototype.deleteRewardScheme = function (rewardScheme) {
        var _this = this;
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
            .body("Are you sure to delete " + rewardScheme.title + '?')
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch(function (err) { return console.log('ERROR: ' + err); })
            .then(function (dialog) { return dialog.result; })
            .then(function (result) {
            _this.rewardSchemesDataService.deleteRewardScheme(rewardScheme.id).subscribe(function (result) {
                if (result)
                    _this.updateRewardScheme(rewardScheme, true);
            });
        })
            .catch(function (err) { });
    };
    return RewardSchemeIndexComponent;
}(base_component_1.BaseComponent));
RewardSchemeIndexComponent = __decorate([
    core_1.Component({
        selector: 'rewardschemesindex',
        template: require('./rewardschemesindex.component.html'),
        styles: [require('./rewardschemesindex.component.css')]
    }),
    __metadata("design:paramtypes", [rewardschemedataservice_1.RewardSchemesDataService, shareservice_1.ShareService,
        angular2_modal_1.Overlay, core_1.ViewContainerRef, bootstrap_1.Modal])
], RewardSchemeIndexComponent);
exports.RewardSchemeIndexComponent = RewardSchemeIndexComponent;
//# sourceMappingURL=rewardschemesindex.component.js.map
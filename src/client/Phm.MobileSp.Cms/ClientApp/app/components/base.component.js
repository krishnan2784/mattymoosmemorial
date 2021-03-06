"use strict";
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
var shareservice_1 = require("../services/helpers/shareservice");
var BaseComponent = (function () {
    function BaseComponent(sharedService, pageTitle, marketDropdownVisiblity, goBackText, tabNavItems) {
        if (goBackText === void 0) { goBackText = ''; }
        if (tabNavItems === void 0) { tabNavItems = []; }
        this.sharedService = sharedService;
        this.updatePageTitle(pageTitle);
        this.updateMarketDropdownVisibility(marketDropdownVisiblity);
        this.updateBackText(goBackText);
        this.updateTabNavItems(tabNavItems);
    }
    BaseComponent.prototype.updatePageTitle = function (pageTitle) {
        if (pageTitle === void 0) { pageTitle = ''; }
        this.sharedService.updatePageTitle(pageTitle);
    };
    BaseComponent.prototype.updateMarketDropdownVisibility = function (displayMarketDropdown) {
        this.sharedService.updateMarketDropdownVisibility(displayMarketDropdown);
        this.sharedService.updateMarketDropdownEnabledState(displayMarketDropdown);
    };
    BaseComponent.prototype.updateBackText = function (backText) {
        var _this = this;
        if (backText === void 0) { backText = ''; }
        this.sharedService.updateBackButton(backText);
        if (backText !== '') {
            this.sharedService.goBackEvent.subscribe(function () {
                _this.goBack();
            });
        }
    };
    BaseComponent.prototype.updateTabNavItems = function (tabNavItems) {
        if (tabNavItems === void 0) { tabNavItems = []; }
        this.sharedService.updateNavTabs(tabNavItems);
    };
    BaseComponent.prototype.updateAppTheme = function (value) {
        this.sharedService.updateAppTheme(value);
    };
    BaseComponent.prototype.goBack = function () {
    };
    BaseComponent.prototype.ngOnDestroy = function () {
        this.updatePageTitle('');
        this.updateMarketDropdownVisibility(false);
        this.updateBackText('');
    };
    return BaseComponent;
}());
BaseComponent = __decorate([
    core_1.Component({
        template: ''
    }),
    __metadata("design:paramtypes", [shareservice_1.ShareService, String, Boolean, String, Array])
], BaseComponent);
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map
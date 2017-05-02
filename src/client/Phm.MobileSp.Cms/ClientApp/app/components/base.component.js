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
var core_1 = require("@angular/core");
var datashareservice_1 = require("../dataservices/datashareservice");
var BaseComponent = (function () {
    function BaseComponent(sharedService, pageTitle, marketDropdownVisiblity) {
        this.sharedService = sharedService;
        this.updatePageTitle(pageTitle);
        this.updateMarketDropdownVisibility(marketDropdownVisiblity);
    }
    BaseComponent.prototype.updatePageTitle = function (pageTitle) {
        this.sharedService.updatePageTitle(pageTitle);
    };
    BaseComponent.prototype.updateMarketDropdownVisibility = function (displayMarketDropdown) {
        this.sharedService.updateMarketDropdownVisibility(displayMarketDropdown);
    };
    BaseComponent.prototype.ngOnDestroy = function () {
        this.updatePageTitle('');
        this.updateMarketDropdownVisibility(false);
    };
    return BaseComponent;
}());
BaseComponent = __decorate([
    core_1.Component({
        template: '',
        providers: [datashareservice_1.ShareService]
    }),
    __metadata("design:paramtypes", [datashareservice_1.ShareService, String, Boolean])
], BaseComponent);
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map
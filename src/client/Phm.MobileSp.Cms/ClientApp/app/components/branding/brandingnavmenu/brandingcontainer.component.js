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
var brandingservice_1 = require("../../../services/brandingservice");
var shareservice_1 = require("../../../services/helpers/shareservice");
var navmenuclasses_1 = require("../../../models/navmenuclasses");
var BrandingNavMenuComponent = (function () {
    function BrandingNavMenuComponent(brandingService, shareService) {
        this.brandingService = brandingService;
        this.shareService = shareService;
    }
    BrandingNavMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.brandingService.getMarketBranding(this.shareService.currentMarketId).subscribe(function (result) {
            _this.brandingSections = result || [];
        });
        this.shareService.updateMainNavMenu([
            new navmenuclasses_1.NavMenuOption('Dashboard', null, { onClick: this.changeSection({}) })
        ]);
    };
    BrandingNavMenuComponent.prototype.changeSection = function (brandingSection) {
        this.activeBrandSection = brandingSection;
    };
    return BrandingNavMenuComponent;
}());
BrandingNavMenuComponent = __decorate([
    core_1.Component({
        selector: 'branding-nav-menu',
        template: require('./brandingnavmenu.component.html'),
        styles: [require('./brandingnavmenu.component.css')]
    }),
    __metadata("design:paramtypes", [brandingservice_1.BrandingService, shareservice_1.ShareService])
], BrandingNavMenuComponent);
exports.BrandingNavMenuComponent = BrandingNavMenuComponent;
//# sourceMappingURL=brandingcontainer.component.js.map
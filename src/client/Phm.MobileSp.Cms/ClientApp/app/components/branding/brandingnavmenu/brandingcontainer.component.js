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
var BrandingContainerComponent = (function () {
    function BrandingContainerComponent(brandingService, shareService) {
        this.brandingService = brandingService;
        this.shareService = shareService;
        this.brandSectionNames = [];
    }
    BrandingContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.brandingService.getMarketBranding(this.shareService.currentMarketId).subscribe(function (result) {
            _this.brandingSections = result || [];
            for (var i = 0; i < _this.brandingSections.length; i++) {
                if (_this.brandSectionNames.indexOf(_this.brandingSections[i].groupDescription) > -1)
                    continue;
                _this.brandSectionNames.push(_this.brandingSections[i].groupDescription);
            }
            if (_this.brandSectionNames.length > 0) {
                var menu = [];
                for (var i = 0; i < _this.brandSectionNames.length; i++) {
                    menu.push(new navmenuclasses_1.NavMenuOption(_this.brandSectionNames[i], null, { onClick: _this.changeSection(_this.brandSectionNames[i]) }));
                }
                _this.shareService.updateMainNavMenu(menu);
                _this.changeSection(_this.brandSectionNames[0]);
            }
        });
    };
    BrandingContainerComponent.prototype.changeSection = function (brandingSection) {
        this.activeBrandingSections = this.brandingSections.filter(function (x) { return x.groupDescription === brandingSection; });
    };
    return BrandingContainerComponent;
}());
BrandingContainerComponent = __decorate([
    core_1.Component({
        selector: 'branding-container',
        template: require('./brandingcontainer.component.html'),
        styles: [require('./brandingcontainer.component.css')]
    }),
    __metadata("design:paramtypes", [brandingservice_1.BrandingService, shareservice_1.ShareService])
], BrandingContainerComponent);
exports.BrandingContainerComponent = BrandingContainerComponent;
//# sourceMappingURL=brandingcontainer.component.js.map
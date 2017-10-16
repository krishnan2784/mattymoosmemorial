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
var brandingservice_1 = require("../../../services/brandingservice");
var shareservice_1 = require("../../../services/helpers/shareservice");
var navmenuclasses_1 = require("../../../models/navmenuclasses");
var brandingclasses_1 = require("../../../models/brandingclasses");
var base_component_1 = require("../../base.component");
var BrandingContainerComponent = (function (_super) {
    __extends(BrandingContainerComponent, _super);
    function BrandingContainerComponent(brandingService, shareService) {
        var _this = _super.call(this, shareService, 'Customise my app', true) || this;
        _this.brandingService = brandingService;
        _this.shareService = shareService;
        _this.brandSectionNames = [];
        _this.disabled = !(_this.shareService.currentMarket.id === 1); // enable for ford global market by default (crude, but we don't have any other global flag)
        _this.cs = _this.changeSection.bind(_this);
        return _this;
    }
    BrandingContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getBranding();
        this.shareService.marketUpdated.subscribe(function (result) {
            _this.activeBrandingSections = null;
            _this.disabled = !(result.id === 1);
            _this.getBranding();
        });
    };
    BrandingContainerComponent.prototype.getBranding = function () {
        var _this = this;
        this.brandingService.getBranding().subscribe(function (result) {
            _this.brandingConfigurations = [];
            if (!result)
                return;
            if (Array.isArray(result))
                _this.brandingConfigurations = result;
            else
                _this.brandingConfigurations.push(new brandingclasses_1.BaseBrandingConfiguration(result));
            if (_this.brandingConfigurations.length > 1) {
                var marketConfig = _this.brandingConfigurations.find(function (x) { return (new brandingclasses_1.MarketBrandingConfiguration(x)).marketId !== null; });
                if (marketConfig) {
                    _this.brandingSections =
                        _this.brandingConfigurations[_this.brandingConfigurations.indexOf(marketConfig)].brandingElements;
                    _this.disabled = false;
                }
            }
            if (!_this.brandingSections)
                _this.brandingSections = _this.brandingConfigurations[0].brandingElements;
            _this.brandingOptions = _this.brandingConfigurations[0].brandingOptions;
            for (var i = 0; i < _this.brandingSections.length; i++) {
                _this.brandingSections[i] = new brandingclasses_1.BrandingElement(_this.brandingSections[i]);
                if (_this.brandSectionNames.indexOf(_this.brandingSections[i].groupName) > -1)
                    continue;
                _this.brandSectionNames.push(_this.brandingSections[i].groupName);
            }
            if (_this.brandSectionNames.length > 0) {
                var menu = [];
                for (var i = 0; i < _this.brandSectionNames.length; i++) {
                    menu.push(new navmenuclasses_1.NavMenuOption(_this.brandSectionNames[i], null, {
                        onClick: _this.cs,
                        activeLink: i === 0,
                        onClickParams: _this.brandSectionNames[i]
                    }));
                }
                _this.shareService.updateMainNavMenu(menu);
                _this.changeSection(_this.brandSectionNames[0]);
            }
        });
    };
    BrandingContainerComponent.prototype.changeSection = function (brandingSection) {
        this.activeBrandingSections = null;
        this.activeBrandingSections = this.brandingSections.filter(function (x) { return x.groupName === brandingSection; });
    };
    return BrandingContainerComponent;
}(base_component_1.BaseComponent));
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
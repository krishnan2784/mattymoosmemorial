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
var shareservice_1 = require("../../services/helpers/shareservice");
var permissionservice_1 = require("../../services/helpers/permissionservice");
var NavMenuComponent = (function () {
    function NavMenuComponent(shareService, permissionService) {
        var _this = this;
        this.shareService = shareService;
        this.permissionService = permissionService;
        this.currentMenuOptions = [];
        this.baseMenuOptions = [];
        this.backText = null;
        this.toggleDropdown = false;
        this.shareService.mainNavUpdated.subscribe(function (navMenu) {
            if (navMenu[2])
                _this.baseMenuOptions = navMenu[0];
            _this.currentMenuOptions = navMenu[0];
            _this.backText = navMenu[1];
        });
    }
    NavMenuComponent.prototype.ngOnInit = function () {
    };
    NavMenuComponent.prototype.resetNavMenu = function () {
        this.currentMenuOptions = this.baseMenuOptions;
        this.shareService.updateAppTheme('');
    };
    NavMenuComponent.prototype.setActiveMenu = function (index) {
        this.currentMenuOptions.forEach(function (x) { return x.activeLink = false; });
        this.currentMenuOptions[index].activeLink = true;
    };
    return NavMenuComponent;
}());
NavMenuComponent = __decorate([
    core_1.Component({
        selector: 'nav-menu',
        template: require('./navmenu.component.html'),
        styles: [require('./navmenu.component.css')]
    }),
    __metadata("design:paramtypes", [shareservice_1.ShareService, permissionservice_1.PermissionService])
], NavMenuComponent);
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=navmenu.component.js.map
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
var navmenuclasses_1 = require("../../models/navmenuclasses");
var NavMenuComponent = (function () {
    function NavMenuComponent(shareService) {
        var _this = this;
        this.shareService = shareService;
        this.currentMenuOptions = [];
        this.baseMenuOptions = [];
        this.shareService.mainNavUpdated.subscribe(function (navMenu) {
            _this.currentMenuOptions = navMenu;
        });
    }
    NavMenuComponent.prototype.ngOnInit = function () {
        //this.navigationService.getNavigationMenu(result => {
        //  this.baseMenuOptions = result;
        //  this.shareService.updateMainNavMenu(result);
        //});
        // until we have permission based menus
        this.baseMenuOptions = [
            new navmenuclasses_1.NavMenuOption('Dashboard', '/home', { activeLink: true }),
            new navmenuclasses_1.NavMenuOption('Content', '/feed'),
            new navmenuclasses_1.NavMenuOption('Reports', '/reports', { routerLinkActiveOptions: { exact: false } }),
            new navmenuclasses_1.NavMenuOption('Accounts', '/useraccountmanagement', { routerLinkActiveOptions: { exact: false } })
        ];
        this.resetNavMenu();
    };
    NavMenuComponent.prototype.resetNavMenu = function () {
        this.currentMenuOptions = this.baseMenuOptions;
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
    __metadata("design:paramtypes", [shareservice_1.ShareService])
], NavMenuComponent);
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=navmenu.component.js.map
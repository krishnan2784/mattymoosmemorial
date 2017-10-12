import { Component, OnInit } from '@angular/core';
import Enums = require("../../enums");
import { ShareService } from "../../services/helpers/shareservice";
import { User } from "../../models/userclasses";
import {NavMenuOption} from "../../models/navmenuclasses";

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent implements OnInit{
    currentMenuOptions: NavMenuOption[] = [];
    baseMenuOptions: NavMenuOption[] = [];
	constructor(public shareService: ShareService) { //, public navigationService: any
		this.shareService.mainNavUpdated.subscribe(navMenu => {
        this.currentMenuOptions = navMenu;
      });
    }

    ngOnInit() {
      //this.navigationService.getNavigationMenu(result => {
      //  this.baseMenuOptions = result;
      //  this.shareService.updateMainNavMenu(result);
      //});
      // until we have permission based menus
      this.baseMenuOptions = [
        new NavMenuOption('Dashboard', '/home'),
        new NavMenuOption('Content', '/feed'),
        new NavMenuOption('Reports', '/reports', { routerLinkActiveOptions: { exact: false } }),
        new NavMenuOption('Accounts', '/useraccountmanagement', { routerLinkActiveOptions: { exact: false } })
      ];
      this.resetNavMenu();
    }
    resetNavMenu() {
      this.currentMenuOptions = this.baseMenuOptions;
    }
}

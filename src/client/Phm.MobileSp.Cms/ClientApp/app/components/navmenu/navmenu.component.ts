import { Component, OnInit } from '@angular/core';
import Enums = require("../../enums");
import { ShareService } from "../../services/helpers/shareservice";
import { User } from "../../models/userclasses";
import {NavMenuOption} from "../../models/navmenuclasses";
import {PermissionService} from "../../services/helpers/permissionservice";

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent implements OnInit{
    currentMenuOptions: NavMenuOption[] = [];
	baseMenuOptions: NavMenuOption[] = [];
	backText = null;
	toggleDropdown=false;
	constructor(public shareService: ShareService, public permissionService: PermissionService) {
		this.shareService.mainNavUpdated.subscribe(navMenu => {
			if (navMenu[2])
				this.baseMenuOptions = navMenu[0];

			this.currentMenuOptions = navMenu[0];
			this.backText = navMenu[1];
		});
    }

    ngOnInit() {
    }
	resetNavMenu() {
		this.currentMenuOptions = this.baseMenuOptions;
	    this.shareService.updateAppTheme('');
	}
	setActiveMenu(index) {
		this.currentMenuOptions.forEach((x) => x.activeLink = false);
		this.currentMenuOptions[index].activeLink = true;
	}
}

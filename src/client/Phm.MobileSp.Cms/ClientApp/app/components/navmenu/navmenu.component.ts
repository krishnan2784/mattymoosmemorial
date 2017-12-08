import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
	constructor(public shareService: ShareService, public permissionService: PermissionService,
		private router:Router) {
		this.shareService.mainNavUpdated.subscribe(navMenu => {
			if (navMenu[2]) {
				this.baseMenuOptions = navMenu[0];
				this.resetNavMenu();
			} else {
				this.currentMenuOptions = navMenu[0];
				this.backText = navMenu[1];
			}
		});
    }

    ngOnInit() {
    }
	resetNavMenu() {
		this.currentMenuOptions = this.baseMenuOptions;
		this.setActiveMenu();
		this.backText = '';
	    this.shareService.updateAppTheme('');
	}

	setActiveMenu() {
		this.currentMenuOptions.filter(x => x.activeLink).forEach(x => x.activeLink = false);
		let urlArray = this.router.url.split('/');

		for (let i = 1; i <= urlArray.length - 1; i += 2) {
			let currentUrl = '/' + urlArray[i];
			this.currentMenuOptions.filter(x => x.routerLink === currentUrl)[0].activeLink = true;
		}
	}
}

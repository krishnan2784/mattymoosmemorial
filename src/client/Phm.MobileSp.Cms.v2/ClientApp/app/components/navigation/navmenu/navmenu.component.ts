import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavMenuOption} from "../../../models/navmenuclasses";
import {ShareService} from "../../../shared/services/helpers/shareservice";
import {PermissionService} from "../../../shared/services/helpers/permissionservice";


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
				this.setActiveMenu();
			}
		});
    }

    ngOnInit() {
	}

	resetNavMenu(fullReset = false) {
		this.currentMenuOptions = this.baseMenuOptions;
		this.backText = '';
		this.shareService.updateAppTheme('');
		if (fullReset) {
			this.currentMenuOptions.filter(x => x.activeLink).forEach(x => x.activeLink = false);
			this.currentMenuOptions[0].activeLink = true;
		} else
			this.setActiveMenu();
	}

	setActiveMenu(index = null) {
		if (!this.currentMenuOptions || this.currentMenuOptions.length === 0)
			return;

		this.currentMenuOptions.filter(x => x.activeLink).forEach(x => x.activeLink = false);

		let urlArray = this.router.url.split('/');

		for (let i = 1; i <= urlArray.length - 1; i += 2) {
			let currentUrl = '/' + urlArray[i];
			if (this.currentMenuOptions.filter(x => x.routerLink === currentUrl)[0])
				this.currentMenuOptions.filter(x => x.routerLink === currentUrl)[0].activeLink = true;
		}

		if (this.currentMenuOptions.filter(x => x.activeLink).length > 0)
			return;

		index = index === null ? 0 : index;
		this.currentMenuOptions[index].activeLink = true;
	}
}

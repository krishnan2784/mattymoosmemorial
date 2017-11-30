import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShareService } from "../services/helpers/shareservice";
import { NavItem } from "./navmenu/tabnavmenu.component";
import {CommonOperationPermissions, PermissionService } from "../services/helpers/permissionservice";
import {BaseComponent} from "./base.component";

@Component({
    template: ''
})
export class IndexComponent extends BaseComponent {
	public userPermissions: CommonOperationPermissions = new CommonOperationPermissions();
	constructor(public sharedService: ShareService, public permissionService: PermissionService,
		pageTitle: string, marketDropdownVisiblity: boolean, goBackText: string = '',
		tabNavItems: NavItem[] = [], public pageKey='') {
		super(sharedService, pageTitle, marketDropdownVisiblity, goBackText, tabNavItems);
		this.userPermissions = permissionService.getCrudPermissions(this.pageKey);

		sharedService.permissionsUpdated.subscribe(() => {

			this.userPermissions = this.permissionService.getCrudPermissions(pageKey);
	    });
    }
}

import { Component } from '@angular/core';
import {BaseComponent} from "./base.component";


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
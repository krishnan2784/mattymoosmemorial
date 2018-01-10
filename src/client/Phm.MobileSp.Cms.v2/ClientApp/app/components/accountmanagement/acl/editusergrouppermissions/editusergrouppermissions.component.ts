import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {SecFeature, SecFeaturePermission } from "../../../../models/securityclasses";
import {User} from "../../../../models/userclasses";
import {EntityPermissionDataService} from "../../../../shared/services/entitypermissiondataservice";
import {UserFeaturePermissionsDataService} from "../../../../shared/services/userfeaturepermissionsdataservice";
import {UserGroupPermissionDataService} from "../../../../shared/services/usergrouppermissiondataservice";
import {ShareService} from "../../../../shared/services/helpers/shareservice";
import {PermissionService} from "../../../../shared/services/helpers/permissionservice";
import { FormGroup } from '@angular/forms';


@Component({
	selector: 'editusergrouppermissions',
	template: require('./editusergrouppermissions.component.html'),
	styles: [require('./editusergrouppermissions.component.css')]
})
export class EditUserGroupComponent implements OnInit, OnDestroy {
	@Input()
	allSecurityFeatures: SecFeature[];
	@Input()
	secEntityId: number;
	@Input()
	currentStep;

	@Output()
	public permissionsUpdated: EventEmitter<SecFeaturePermission[]> = new EventEmitter<SecFeaturePermission[]>();

	form: FormGroup;
	loading: boolean = true;
	navbarData;
	groupFeaturePermissions: SecFeaturePermission[];
	usersInGroup: User[];
	constructor(public epDataService: EntityPermissionDataService,
		public entityPermissionDataService: UserFeaturePermissionsDataService,
		public userGroupPermissionDataService: UserGroupPermissionDataService,
		public sharedService: ShareService, public permissionService: PermissionService) {
		this.form = new FormGroup({});
	}

	ngOnInit() {
		this.getData();
		this.setupSteps();
	}

	ngOnDestroy() {

	}

	getData() {
		this.userGroupPermissionDataService.getSecurityGroupUsers(this.secEntityId).subscribe(x => {
			this.usersInGroup = x ? x : [];
		});
		this.epDataService.getEntityPermissions(this.secEntityId).subscribe(x => {
			this.groupFeaturePermissions = (!x || x.length === 0 ? [] : x);
		});
	}

	setupSteps() {
		this.navbarData = [{ id: 'group', text: 'Group Permissions', selected: this.currentStep === 'group' },
			{ id: 'users', text: 'Users Permissions', selected: this.currentStep === 'users' }];
	}
	
	updateCurrentStep(step) {
		this.currentStep = step;
	}

	save(secFeaturePermissions, isValid: boolean, goBack = true) {
		this.loading = true;

		this.entityPermissionDataService.updateEntityPermissions(secFeaturePermissions.secEntityPermissions).subscribe(x => {
			this.loading = false;
			if (x && x.success) {
				this.permissionService.refreshData();
				if (goBack) {
					this.permissionsUpdated.emit(x.content);
				}
			}
		});
	}


	goBack() {
		this.permissionsUpdated.emit(null);
	}
}

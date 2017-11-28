import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {ShareService} from "../../../../services/helpers/shareservice";
import { SecFeature, SecFeaturePermission } from "../../../../models/securityclasses";
import {EntityPermissionDataService} from "../../../../services/entitypermissiondataservice";
import { FormGroup } from "@angular/forms";
import {UserFeaturePermissionsDataService} from "../../../../services/userfeaturepermissionsdataservice";
import {User} from "../../../../models/userclasses";


@Component({
	selector: 'edituserpermissions',
	template: require('./edituserpermissions.component.html'),
	styles: [require('./edituserpermissions.component.css')]
})
export class EditUserPermissionsComponent implements OnInit, OnDestroy {
	@Input()
	allSecurityFeatures: SecFeature[];
	@Input()
	secEntityId: number;
	@Input()
	user: User;
	@Input()
	groupFeaturePermissions: SecFeaturePermission[];

	@Output()
	public savePermissions: EventEmitter<SecFeaturePermission[]> = new EventEmitter<SecFeaturePermission[]>();

	editMode: boolean = false;
	form: FormGroup;
	loading: boolean = true;

	constructor(public epDataService: EntityPermissionDataService,
		public entityPermissionDataService: UserFeaturePermissionsDataService,
		public sharedService: ShareService) {
		this.form = new FormGroup({});
	}

	ngOnInit() {
    }

	ngOnDestroy() {

	}

	save(secFeaturePermissions, isValid: boolean) {
		if (isValid)
			this.savePermissions.emit(secFeaturePermissions);
	}

	goBack() {
		this.editMode = false;
	}
}
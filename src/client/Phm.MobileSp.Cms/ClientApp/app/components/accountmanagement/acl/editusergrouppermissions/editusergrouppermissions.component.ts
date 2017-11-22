import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {ShareService} from "../../../../services/helpers/shareservice";
import { SecFeature, SecFeaturePermission } from "../../../../models/securityclasses";
import {EntityPermissionDataService} from "../../../../services/entitypermissiondataservice";
import { FormGroup } from "@angular/forms";
import {UserFeaturePermissionsDataService} from "../../../../services/userfeaturepermissionsdataservice";


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
	
	@Output()
	public permissionsUpdated: EventEmitter<SecFeaturePermission[]> = new EventEmitter<SecFeaturePermission[]>();

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

		console.log(secFeaturePermissions);
		this.loading = true;

		this.entityPermissionDataService.updateEntityPermissions(secFeaturePermissions.secEntityPermissions).subscribe(x => {
			this.loading = false;
			if (x && x.success) {
				this.permissionsUpdated.emit(x.content);
			}
		});
	}


	goBack() {
				this.permissionsUpdated.emit(null);
	}
}
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {ShareService} from "../../../../services/helpers/shareservice";
import { SecFeature, SecFeaturePermission } from "../../../../models/securityclasses";
import {EntityPermissionDataService} from "../../../../services/entitypermissiondataservice";
import { FormGroup, FormArray, FormControl, FormBuilder } from "@angular/forms";


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

	form: FormGroup;
	loading: boolean = true;

	constructor(public epDataService: EntityPermissionDataService,
		public sharedService: ShareService) {
		this.form = new FormGroup({});
	}

	ngOnInit() {
    }

	ngOnDestroy() {

	}

	save(secFeaturePermissions: SecFeaturePermission[], isValid: boolean) {
		console.log(secFeaturePermissions);
	}

}
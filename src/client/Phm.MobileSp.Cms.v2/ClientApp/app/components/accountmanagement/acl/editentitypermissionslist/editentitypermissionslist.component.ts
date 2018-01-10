import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SecFeature, SecFeaturePermission } from "../../../../models/securityclasses";
import { FormGroup, FormArray, FormControl } from "@angular/forms";
import {SecFeatureTypeEnum} from "../../../../../enums";
import {EntityPermissionDataService} from "../../../../shared/services/entitypermissiondataservice";
import {ShareService} from "../../../../shared/services/helpers/shareservice";


@Component({
	selector: 'editentitypermissionslist',
	template: require('./editentitypermissionslist.component.html'),
	styles: [require('./editentitypermissionslist.component.css')]
})
export class EditEntityPermissionsListComponent implements OnInit, OnDestroy {
	@Input()
	allSecurityFeatures: SecFeature[];
	@Input()
	secEntityId: number;
	@Input()
	form: FormGroup;
	@Input()
	groupFeaturePermissions: SecFeaturePermission[] = [];
	@Input()
	groupMode; 
	@Input()
	userId;

	@Output()
	formLoaded = new EventEmitter<any>();
	secFeatureTypeEnum: typeof SecFeatureTypeEnum = SecFeatureTypeEnum;
	entityFeaturePermissions: SecFeaturePermission[];
	constructor(public epDataService: EntityPermissionDataService,
		public sharedService: ShareService) {
	}

	ngOnInit() {
		if (this.groupMode) {
			setTimeout(() => {
				this.entityFeaturePermissions = this.groupFeaturePermissions;
				this.setupForm();
				this.formLoaded.emit(true);
			},10);
		} else
			this.getData();
    }

	ngOnDestroy() {

    }

	getData() {
		this.epDataService.getEntityPermissions(this.secEntityId).subscribe(x => {
			if (!x || x.length === 0)
				this.entityFeaturePermissions = (this.groupMode ? this.groupFeaturePermissions : []);
			else
				this.entityFeaturePermissions = x;
			this.setupForm();
			this.formLoaded.emit(true);
		});
	}

	setupForm() {
		var formArray = new FormArray([]);
		this.allSecurityFeatures.forEach(x => {
			var up = this.entityFeaturePermissions.filter(y => x.id === y.secFeatureId)[0];
			if (!up && this.groupFeaturePermissions)
				up = this.groupFeaturePermissions.filter(y => x.id === y.secFeatureId)[0];

			if (up)
				formArray.push(this.initFeature(up));
			else
				formArray.push(this.initFeature(new SecFeaturePermission({
					secEntityId: this.secEntityId,
					secFeatureId: x.id,
					allow: false
				})));
		});
		this.form.addControl('secEntityPermissions', formArray);
	}

	initFeature(feature: SecFeaturePermission = null): FormGroup {
		return new FormGroup({
			secEntityId: new FormControl(this.secEntityId, []),
			secFeatureId: new FormControl(feature.secFeatureId, []),
			allow: new FormControl(feature.allow, []),
		});
	}

	setPermission(i, permitted) {
		var permissions = <FormArray>this.form.controls['secEntityPermissions'];
		var thisPermission: any = permissions.controls[i];
		thisPermission.controls.allow.setValue(permitted, { onlySelf: true });
		thisPermission.controls.allow.updateValueAndValidity();
	}
}

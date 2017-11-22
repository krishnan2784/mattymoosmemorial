import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {ShareService} from "../../../../services/helpers/shareservice";
import { SecFeature, SecFeaturePermission } from "../../../../models/securityclasses";
import {EntityPermissionDataService} from "../../../../services/entitypermissiondataservice";
import { FormGroup, FormArray, FormControl } from "@angular/forms";
import {SecFeatureTypeEnum} from "../../../../enums";


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

	@Output()
	formLoaded = new EventEmitter<any>();

	entityFeaturePermissions: SecFeaturePermission[];
	secFeatureTypeEnum: typeof SecFeatureTypeEnum = SecFeatureTypeEnum;

	constructor(public epDataService: EntityPermissionDataService,
		public sharedService: ShareService) {
	}

	ngOnInit() {
		this.getData();

    }

	ngOnDestroy() {

    }

	getData() {
		this.epDataService.getEntityPermissions(this.secEntityId).subscribe(x => {
			this.entityFeaturePermissions = (!x || x.length === 0 ? [] : x);
			this.setupForm();
			this.formLoaded.emit(true);
		});
	}

	setupForm() {
		this.form.valueChanges.subscribe(x => { console.log(x); });
		var formArray = new FormArray([]);
		this.allSecurityFeatures.forEach(x => {
			var up = this.entityFeaturePermissions.filter(y => x.id === y.secFeatureId)[0];
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
			secEntityId: new FormControl(feature.secEntityId, []),
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
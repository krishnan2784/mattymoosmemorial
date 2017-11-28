import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import {BrandingElement, BrandingConfigurationOption } from "../../../models/brandingclasses";
import { FormControl, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import {BrandingService} from "../../../services/brandingservice";

@Component({
    selector: 'branding-section',
    template: require('./brandingcontentsection.component.html'),
    styles: [require('./brandingcontentsection.component.css')]
})
export class BrandingContentSectionComponent implements OnInit, OnDestroy, OnChanges {
	@Input()
	public models: BrandingElement[];
	@Input()
	disabled: boolean;
	@Input()
	brandingOptions: BrandingConfigurationOption[];

	public form: FormGroup;
	public submitted: boolean = false;
	public subGroups: [string, BrandingElement[]][];

	constructor(public fb: FormBuilder, public brandingService: BrandingService) {
		this.form = this.fb.group({});
	}

	ngOnInit() {
		this.addFormControls();
		this.calculateSubGroups();
	}

	ngOnDestroy() {
		this.removeFormControls();
	}

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		if (changes['models']) {
			this.removeFormControls();
			this.addFormControls();
			this.calculateSubGroups();
		}
	}

	addFormControls() {
		var formArray = new FormArray([]);
		this.models.forEach((x, i) => formArray.push(this.initBrandingElement(x)));
		this.form.addControl('brandingElements', formArray);
	};

	removeFormControls() {
		this.form.removeControl('brandingElements');
	}

	public initBrandingElement(model: BrandingElement): FormGroup {
		return new FormGroup({
			id: new FormControl(model.id, []),
			order: new FormControl(model.order, []),
			groupName: new FormControl(model.groupName, []),
			value: new FormControl(model.value, []),
			primaryImageId: new FormControl(model.primaryImageId, []),
			secondaryImageId: new FormControl(model.secondaryImageId, [])
		});
	} 

	calculateSubGroups() {
		this.subGroups = [];
		if (this.models)
			for (let i = 0; i < this.models.length; i++) {
				this.addSubGroup(this.models[i]);
			}
	}

	addSubGroup(element: BrandingElement) {
		let a = element.groupName.split('>');
		var n = (a.length > 1 ? a[1] : element.description);
		let m = this.subGroups.find(x => x[0] === n);
		if (m)
			m[1].push(element);
		else
			this.subGroups.push([n, [element]]);
	}

	save(form, isValid) {
		this.submitted = true;
		this.brandingService.updateBranding(form.brandingElements).subscribe(result => {
			this.submitted = false;
		});
	}
}

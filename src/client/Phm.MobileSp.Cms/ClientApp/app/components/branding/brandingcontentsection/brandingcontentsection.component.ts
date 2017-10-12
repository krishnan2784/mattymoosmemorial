import { Component, Input } from '@angular/core';
import {BrandingElement} from "../../../models/brandingclasses";
import { FormControl, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import {BrandingService} from "../../../services/brandingservice";

@Component({
    selector: 'branding-section',
    template: require('./brandingcontentsection.component.html'),
    styles: [require('./brandingcontentsection.component.css')]
})
export class BrandingContentSectionComponent {
	@Input()
	public models: BrandingElement[];

	public form: FormGroup;
	public submitted: boolean;

	constructor(public fb: FormBuilder, public brandingService: BrandingService) {
		this.form = this.fb.group({});
	}

	ngOnInit() {
		this.addFormControls();
	}

	addFormControls() {
		var formArray = new FormArray([]);
		this.models.forEach((x, i) => formArray.push(this.initBrandingElement(x)));
		this.form.addControl('brandingElements', formArray);
	};

	public initBrandingElement(model: BrandingElement): FormGroup {
		return new FormGroup({
			id: new FormControl(model.id, []),
			masterId: new FormControl(model.masterId, []),
			order: new FormControl(model.order, []),
			enabled: new FormControl(model.enabled, []),
			published: new FormControl(model.published, []),
			createdAt: new FormControl(model.createdAt, []),
			updatedAt: new FormControl(model.updatedAt, []),
			value: new FormControl(model.value, []),
			primaryImageId: new FormControl(model.primaryImageId, []),
			secondaryImageId: new FormControl(model.secondaryImageId, [])
		});
	} 
	save(form, isValid) {
		console.log(form.brandingElements);
		this.brandingService.updateBranding(form.brandingElements).subscribe(result => {
			console.log(result);
		});
	}
}

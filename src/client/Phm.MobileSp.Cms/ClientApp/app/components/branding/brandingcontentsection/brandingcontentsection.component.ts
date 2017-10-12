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
	@Input()
	disabled: boolean;

	public form: FormGroup;
	public submitted: boolean = false;

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
			order: new FormControl(model.order, []),
			groupName: new FormControl(model.groupName, []),
			value: new FormControl(model.value, []),
			primaryImageId: new FormControl(model.primaryImageId, []),
			secondaryImageId: new FormControl(model.secondaryImageId, [])
		});
	} 
	save(form, isValid) {
		this.submitted = true;
		this.brandingService.updateBranding(form.brandingElements).subscribe(result => {
			this.submitted = false;
		});
	}
}

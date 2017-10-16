import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {BrandingElement, BrandingConfigurationOption } from "../../../../models/brandingclasses";
import {BrandingElementType, UploaderType } from "../../../../enums";
import {StringEx} from "../../../../classes/helpers/string";

@Component({
    selector: 'base-branding-component',
    template: require('./basebrandingcomponent.component.html'),
    styles: [require('./basebrandingcomponent.component.css')]
})
export class BaseBrandingComponent implements OnInit {
	@Output()
	public componentUpdated: EventEmitter<any> = new EventEmitter<any>();
	@Input()
	public model: BrandingElement;
	@Input()
	public form: FormGroup;
	@Input()
	public submitted: boolean;
	@Input()
	public index: number;
	@Input()
	disabled: boolean;
	@Input()
	brandingOptions: BrandingConfigurationOption[];
	elementBrandingOptions: BrandingConfigurationOption[];
	@Output()
	public mediaUploading: EventEmitter<boolean> = new EventEmitter();

	brandingElementType: typeof BrandingElementType = BrandingElementType;
	uploaderTypes: typeof UploaderType = UploaderType;

	constructor() {

	}

	ngOnInit() {
		if (this.model && this.model.brandingElementType == this.brandingElementType.CustomSelection && this.brandingOptions) {
			this.elementBrandingOptions = StringEx.searchArray(this.model.key, this.brandingOptions, ['configurationKey']);
		}
	}

}

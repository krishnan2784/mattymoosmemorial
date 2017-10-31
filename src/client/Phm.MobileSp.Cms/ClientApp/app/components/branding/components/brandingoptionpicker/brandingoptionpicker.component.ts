import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import {BrandingConfigurationOption} from "../../../../models/brandingclasses";

@Component({
	selector: 'brandingoptionpicker',
  template: `
<div [formGroup]="form" *ngIf="form">
	<input type="hidden" formControlName="{{formControlId}}">
	    <h5 [attr.for]="elementId">{{label}}</h5>
		<div class="option-container">
			<span *ngFor="let o of options" class="option-selector">
				<input type="radio" class="with-gap" id="option-{{o.id}}" [value]="o.value" [checked]="form.controls[formControlId].value == o.value" (click)="setOption(o.value)" />
				<label [attr.for]="'option-' + o.id">{{o.displayName}}</label>
			</span>
		</div>
<div class="clearfix"></div>
    </div>
`,
  styles: [require('./brandingoptionpicker.component.css')]
})
export class BrandingOptionPickerComponent implements OnInit, AfterViewInit {
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string = '';
    @Input() label: string = '';
	@Input() disabled: boolean = false;
	@Input() formSubmitted: boolean = false;
	@Input() options: BrandingConfigurationOption[] = [];
	ngOnInit() {
        if (this.elementId == '')
            this.elementId = this.formControlId;
	}
    ngAfterViewInit() {

	}
	setOption(option) {
		this.form.controls[this.formControlId].patchValue(option, {});
	}
}

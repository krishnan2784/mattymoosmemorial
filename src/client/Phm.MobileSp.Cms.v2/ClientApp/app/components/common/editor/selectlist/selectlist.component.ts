import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var $: any;

@Component({
	selector: 'selectlist',
  template: `
    <div [formGroup]="form" *ngIf="form">
	        <label *ngIf="label" [attr.for]="elementId">{{label}}</label>
	        <mat-select id="{{elementId}}" formControlName="{{formControlId}}" [(ngModel)]="selectedValue" [attr.disabled]="disabled ? 'disabled' : null">
		        <mat-option *ngFor="let v of values" [value]="v.value">{{v.name}}</mat-option>
	        </mat-select>
	        <small *ngIf="validationMessage" class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
		        {{validationMessage}}
	        </small>
    </div>
`
})
export class SelectListComponent implements OnInit {
	@Input() values: {name:string, value:any}[] = [];
	@Input() defaultValue: string;
	@Input() selectedValue: any = '';
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string = '';
    @Input() label: string = '';
    @Input() validationMessage: string = '';
    @Input() formSubmitted: boolean = false;
	@Input() disabled: boolean = false;

	ngOnInit() {
		//if (!this.selectedValue)
		//	this.selectedValue = this.values && this.values.length > 0 ? this.values[0] : {};
		$(document).ready(() => {
			$('#' + this.elementId).material_select();
		});
	}
}

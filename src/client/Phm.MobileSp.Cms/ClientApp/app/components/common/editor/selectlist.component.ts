import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var $: any;

@Component({
	selector: 'selectlist',
  template: `
    <div [formGroup]="form" *ngIf="form">
	        <label *ngIf="label" [attr.for]="elementId">{{label}}</label>
	        <select id="{{elementId}}" formControlName="{{formControlId}}" materialize="material_select" [(ngModel)]="selectedValue" class="browser-default">
		        <option *ngFor="let v of values" [ngValue]="v.value">{{v.name}}</option>
	        </select>
	        <small *ngIf="validationMessage" class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
		        {{validationMessage}}
	        </small>
    </div>
`
})
export class SelectListComponent implements OnInit {
	@Input() values: {name:string, value:any}[] = [];
	@Input() selectedValue: any;
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string = '';
    @Input() label: string = '';
    @Input() validationMessage: string = '';
    @Input() formSubmitted: boolean = false;

	ngOnInit() {
		//if (!this.selectedValue)
		//	this.selectedValue = this.values && this.values.length > 0 ? this.values[0] : {};
		$(document).ready(() => {
			$('#' + this.elementId).material_select();
		});
	}
}

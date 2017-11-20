import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var $: any;

@Component({
	selector: 'date-range',
	styles: [``],
	template: `
<div [formGroup]="form" *ngIf="form">
    <input type="hidden" formControlName="{{date1FormControlId}}">
    <input type="hidden" formControlName="{{date2FormControlId}}">
		<div class="col-md-6">
	        <label>{{date1Label}}</label>
	        <datepicker (dateSelected)="handleStartDate($event);" [initialDate]="form.controls[this.date1FormControlId].value" 
			[cannotSelectPast]="true" [minDay]="1" [minJsMonth]="2" [minYear]="2017" [elementId]="date1ElementId"></datepicker>
        </div>

		<div class="col-md-6">
	        <label>{{date2Label}}</label>
	        <datepicker (dateSelected)="handleEndDate($event);" [initialDate]="form.controls[this.date2FormControlId].value" 
			[cannotSelectPast]="true" [minDay]="minDay" [minJsMonth]="minMonth" [minYear]="minYear" [elementId]="date2ElementId"></datepicker>
        </div>
<div class="clearfix"></div>
</div>
`})
export class DateRangeComponent implements OnInit {
	@Input() form: FormGroup;

	@Input() date1FormControlId: string;
	@Input() date1Label: string = '';
	@Input() date1ElementId: string;

	@Input() date2FormControlId: string;
	@Input() date2Label: string = '';
	@Input() date2ElementId: string;

	minDay;
	minMonth;
	minYear;
	ngOnInit() {
		if (!this.form.controls[this.date1FormControlId].value || this.form.controls[this.date1FormControlId].value == '') {
			var now = new Date();
			this.handleStartDate(now);
			now.setDate(now.getDate() + 14);
			this.handleEndDate(now);
		}
	}

	handleStartDate(e) {
		this.minDay = e.day;
		this.minMonth = e.month;
		this.minYear = e.year;
		this.form.controls[this.date1FormControlId].setValue(e.fullDate);
		if (new Date(this.form.controls[this.date2FormControlId].value) < e.fullDate) {
			this.handleEndDate(e);
		}
		this.form.markAsDirty();
	}

	handleEndDate(e) {
		this.form.controls[this.date2FormControlId].setValue(e.fullDate);
		this.form.markAsDirty();
	}

	setMinDate(date) {
		var now = new Date();
		if (new Date(date) < now)
			date = now;

		this.minDay = date.getDate();
		this.minMonth = date.getMonth();
		this.minYear = date.getFullYear();
	}

}

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'numbertextinput',
  template: `
    <div [formGroup]="form" *ngIf="form">
        <mat-form-field>
            <input matInput id="{{elementId}}" type="{{allowFractions ? 'text' : 'number'}}"
				    formControlName="{{formControlId}}" (keydown)="handleInput($event)" (keyup)="checkPoint()" 
                   placeholder="{{label}}">
            <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
                {{validationMessage}}
            </small>
        </mat-form-field>
    </div>
`
})
export class NumberTextInputComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string = '';
    @Input() label: string = '';
    @Input() validationMessage: string = '';
    @Input() formSubmitted: boolean = false;
	@Input() allowFractions: boolean = false;
	@Input() decimalPlaces :number = 2;
  @Input() placeholder: string = ''; // currently being ignored as we use the label as a placeholder
    hasPoint: boolean = false;
    activeClass: string = '';
    ngOnInit() {
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId]) {
			this.activeClass = this.placeholder !== '' || (this.form.controls[this.formControlId].value
            && this.form.controls[this.formControlId].value.toString().length > 0) ? "active" : "";
		}
	    this.checkPoint();
    }
	handleInput(e) {
		if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')
			return;
		this.filterInput(e);
	}
    filterInput(e) {
      // setting the type to number doesn't prevent the current versions of firefox and edge accepting 
      // non-numerical characters and only fails validation. To maintain consistency with Chrome we are 
      // (and also to prevent the 'e' character being entered) we're also manually checking input
      let char = e.key,
        currValue = this.form && this.form.controls[this.formControlId]
          && this.form.controls[this.formControlId].value ? this.form.controls[this.formControlId].value.toString() : '';
	  var success;
		if (e.key === '.') {
			if (!this.allowFractions || this.hasPoint || currValue.length === 0) {
				e.preventDefault();
				return;
			}
			this.hasPoint = true;
			success = true;
		} else {
			success = char.match(/[0-9]/);
			if (success && this.allowFractions && this.hasPoint)
				  success = currValue.length < (currValue.indexOf('.') + 1) + this.decimalPlaces;
		}
		if (!success) {
			e.preventDefault();
		} 
	}
	checkPoint() {
		if (this.allowFractions) {
			let currValue = this.form && this.form.controls[this.formControlId] && this.form.controls[this.formControlId].value
				? this.form.controls[this.formControlId].value.toString()
				: '';
			this.hasPoint = currValue.includes('.');
		}
		return this.hasPoint;
	}
}

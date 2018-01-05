import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var $: any;

@Component({
  selector: 'textinput',
  template: `
<div [formGroup]="form" *ngIf="form">
      <mat-form-field>
        <input matInput id="{{elementId}}" type="text" placeholder="{{label}}" formControlName="{{formControlId}}" [attr.maxLength]="maxLength > 0 ? maxLength : null" [attr.data-length]="maxLength > 0 ? maxLength : null">
        <mat-hint align="end" *ngIf="maxLength>0">{{form.controls[formControlId].value.length}} / {{maxLength}}</mat-hint>
        <small *ngIf="validationMessage" class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
          {{validationMessage}}
        </small>
      </mat-form-field>
    </div>
`
})
export class TextInputComponent implements OnInit, AfterViewInit {
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string = '';
    @Input() label: string = '';
    @Input() validationMessage: string = '';
    @Input() formSubmitted: boolean = false;
	  @Input() maxLength: number = 0;
	  @Input() placeholder: string = ''; // currently being ignored as we use the label as a placeholder
    activeClass: string = '';
    ngOnInit() {
        if (this.elementId == '')
            this.elementId = this.formControlId;
		if (this.form && this.form.controls[this.formControlId] && this.form.controls[this.formControlId].value) {
            this.activeClass = this.placeholder !== '' || this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
        }
    }
    ngAfterViewInit() {
       // $('#' + this.elementId).characterCounter();
    }
}

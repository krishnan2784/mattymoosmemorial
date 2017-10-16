import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'colourpicker',
  template: `
    <div [formGroup]="form" *ngIf="form">
	    <input type="hidden" formControlName="{{formControlId}}">
	    <h5 [attr.for]="elementId">{{label}}</h5>
		<div id="{{elementId}}" class="colour-block" [class.disabled]="disabled" [style.background]="form.controls[formControlId].value">
			<span *ngIf="!disabled" [(colorPicker)]="form.controls[formControlId].value" 				  
				    [cpCancelButton]="true"
				    [cpOutputFormat]="hex"
				    [cpOKButton]="true"
				    [cpAlphaChannel]="disabled"
				    (colorPickerSelect)="setColour($event)">{{form.controls[formControlId].value}}</span>
			<span *ngIf="disabled">{{form.controls[formControlId].value}}</span>
		</div>            
        <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
            {{validationMessage}}
        </small>
    </div>
`,
  styles: [require('./colourpicker.component.css')]
})
export class ColourPickerInputComponent implements OnInit, AfterViewInit {
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string = '';
    @Input() label: string = '';
    @Input() validationMessage: string = '';
	@Input() formSubmitted: boolean = false;
	@Input() disabled: boolean = false;
	ngOnInit() {
        if (this.elementId == '')
            this.elementId = this.formControlId;
		if (this.form.controls[this.formControlId].value && this.form.controls[this.formControlId].value.indexOf('#') == -1)
			this.form.controls[this.formControlId].patchValue('#' + this.form.controls[this.formControlId].value, {});

    }
    ngAfterViewInit() {

	}
	setColour(colour) {
		this.form.controls[this.formControlId].patchValue(colour, {});
	}
}

import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'fontpicker',
  template: `
    <div [formGroup]="form" *ngIf="form">
	    <h5 [attr.for]="elementId">{{label}}</h5>
	    <select id="{{elementId}}" formControlName="{{formControlId}}" [attr.disabled]="disabled ? disabled : null" [style.font-family]="form.controls[formControlId].value">
		    <option *ngFor="let f of availableFonts" value="{{f}}" [attr.selected]="f==form.controls[formControlId].value ? 'selected' : null" [style.font-family]="f">{{f}}</option>
	    </select>
    </div>
`,
  styles: [require('./fontpicker.component.css')]
})
export class FontPickerComponent implements OnInit, AfterViewInit {
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string = '';
    @Input() label: string = '';
    @Input() validationMessage: string = '';
    @Input() formSubmitted: boolean = false;
	@Input() maxLength: number = 0;
	@Input() disabled: boolean = false;
	@Input() availableFonts: string[] = ['Arial', 'Times New Roman'];
    activeClass: string = '';
    ngOnInit() {
        if (this.elementId == '')
            this.elementId = this.formControlId;
    }
    ngAfterViewInit() {
    }
}

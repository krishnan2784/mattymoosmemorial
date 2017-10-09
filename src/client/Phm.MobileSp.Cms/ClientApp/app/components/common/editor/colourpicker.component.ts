import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'colourpicker',
  template: `
    <div [formGroup]="form" *ngIf="form">
        <div class="input-field">
            <input id="{{elementId}}" type="text" formControlName="{{formControlId}}" [colorPicker]="form.controls[formControlId].value">
            <label [attr.for]="elementId">{{label}}</label>
            <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
                {{validationMessage}}
            </small>
        </div>
    </div>
`
})
export class ColourPickerInputComponent implements OnInit, AfterViewInit {
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string = '';
    @Input() label: string = '';
    @Input() validationMessage: string = '';
    @Input() formSubmitted: boolean = false;
    @Input() maxLength: number = 0;
    ngOnInit() {
        if (this.elementId == '')
            this.elementId = this.formControlId;

    }
    ngAfterViewInit() {

    }
}

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'numbertextinput',
  template: `
    <div [formGroup]="form" *ngIf="form">
        <div class="input-field">
            <input id="{{elementId}}" type="number" formControlName="{{formControlId}}">
            <label [attr.for]="elementId" class="{{activeClass}}">{{label}}</label>
            <small [class.active-warning]="!form.controls[formControlId].valid && formSubmitted">
                {{validationMessage}}
            </small>
        </div>
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
    activeClass: string = '';
    ngOnInit() {
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId]) {
            this.activeClass = this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
        }
    }
}

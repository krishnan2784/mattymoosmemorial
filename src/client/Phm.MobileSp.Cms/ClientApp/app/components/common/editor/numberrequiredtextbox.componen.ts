import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'requiredtextinput',
    template: `
    <div [formGroup]="form" *ngIf="form">
        <div class="input-field">
            <input id="{{elementId}}" type="text" formControlName="{{formControlId}}" number required>
            <label [attr.for]="elementId" class="{{activeClass}}">{{label}}</label>
            <small [class.active-warning]="!form.controls[formControlId].valid && formSubmitted">
                {{validationMessage}}
            </small>
        </div>
        <div *ngIf="name.errors && (name.dirty || name.touched)" class="alert alert-danger">
            <div [hidden]="!name.errors.required">
                {{formControlId}} is required
            </div>
            <div [hidden]="!name.errors.number">
                Please enter numeric values.
            </div>
        </div>
    </div>
`
})
export class NumberRequiredTextInputComponent implements OnInit {
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

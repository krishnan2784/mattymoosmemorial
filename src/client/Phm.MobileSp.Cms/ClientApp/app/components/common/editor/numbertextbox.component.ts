import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'numbertextinput',
  template: `
    <div [formGroup]="form" *ngIf="form">
        <div class="input-field">
            <input id="{{elementId}}" type="number" formControlName="{{formControlId}}" (keypress)="filterInput($event)">
            <label [attr.for]="elementId" class="{{activeClass}}">{{label}}</label>
            <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
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
    @Input() allowFractions: boolean = false;
    hasPoint: boolean = false;
    activeClass: string = '';
    ngOnInit() {
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId]) {
            this.activeClass = this.form.controls[this.formControlId].value && this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
        }
    }
    filterInput(e) {
      let char = e.key,
        currValue = this.form && this.form.controls[this.formControlId] && this.form.controls[this.formControlId].value ? this.form.controls[this.formControlId].value.toString() : '';
      var success;
      if (e.key === '.') {
        if (!this.allowFractions || this.hasPoint || currValue.length === 0) {
          event.preventDefault();
          return;
        }
        this.hasPoint = true;
        success = true;
      } else {
        this.hasPoint = currValue.includes('.');
        success = char.match(/[0-9]/);
      }
      if (!success) {
          event.preventDefault();
      } 
    }
}

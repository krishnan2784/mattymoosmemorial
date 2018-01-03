import { Component, Input, Output, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var tinymce: any;
declare var $: any;

@Component({
    selector: 'enhancedtextarea',
  template: `
    <div [formGroup]="form" *ngIf="form">
        <md-form-field>
              <textarea mdInput id="{{elementId}}" formControlName="{{formControlId}}" placeholder="{{label}}" *ngIf="formControlId" [attr.maxLength]="maxLength > 0 ? maxLength : null" [attr.data-length]="maxLength > 0 ? maxLength : null" [attr.disabled]="disabled ? disabled : null"></textarea>
              <md-hint align="end" *ngIf="maxLength>0">{{form.controls[formControlId].value.length}} / {{maxLength}}</md-hint>
              <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
                    {{validationMessage}}
                </small>
        </md-form-field>
    </div>`
})
export class TextAreaComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string;
    @Input() value: string = '';
    @Input() maxLength: number = 0;
    @Input() disabled: boolean = false;
    @Input() label: string = '';
    @Input() validationMessage: string = '';
    @Input() formSubmitted: boolean = false;
    @Output() onEditorKeyup = new EventEmitter<any>();
    editor;
    activeClass: string = '';
    ngOnInit() {
        if (this.form.controls[this.formControlId].value == null)
            this.form.controls[this.formControlId].setValue('');
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId]) 
            this.activeClass = this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
    }
  ngAfterViewInit()
  {
  }

  ngOnDestroy() {
  }
}

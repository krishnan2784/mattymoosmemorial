import { Component, Input, Output, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var $: any;

@Component({
    selector: 'enhancedtextarea',
    template: `
    <div [formGroup]="form" *ngIf="form">
        <mat-form-field>
              <textarea matInput *ngIf="formControlId" id="{{elementId}}" formControlName="{{formControlId}}" placeholder="{{label}}"
              [attr.maxLength]="maxLength > 0 ? maxLength : null"
              [attr.data-length]="maxLength > 0 ? maxLength : null" [attr.disabled]="disabled ? disabled : null"></textarea>

              <mat-hint align="end" *ngIf="maxLength>0">{{form.controls[formControlId].value.length}} / {{maxLength}}</mat-hint>
              <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
                    {{validationMessage}}
                </small>
        </mat-form-field>
    </div>
`
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
  @Input() placeholder: string = ''; // currently being ignored as we use the label as a placeholder
    editor;
    activeClass: string = '';
    ngOnInit() {
        if (this.form.controls[this.formControlId].value == null)
            this.form.controls[this.formControlId].setValue('');
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId]) 
			this.activeClass = this.placeholder !== '' || this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
    }
  ngAfterViewInit()
  {
      //$('#' + this.elementId).trigger('autoresize').characterCounter();
  }

  ngOnDestroy() {
  }
}

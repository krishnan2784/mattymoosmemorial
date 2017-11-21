import { Component, Input, Output, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var tinymce: any;
declare var $: any;

@Component({
    selector: 'enhancedtextarea',
  template: `
    <div [formGroup]="form" *ngIf="form">
        <div class="input-field">
              <label [attr.for]="elementId" class="{{activeClass}}">{{label}}</label>
              <textarea id="{{elementId}}" formControlName="{{formControlId}}" *ngIf="formControlId" class="materialize-textarea" [attr.maxLength]="maxLength > 0 ? maxLength : null" 
[attr.data-length]="maxLength > 0 ? maxLength : null" [attr.disabled]="disabled ? disabled : null" [attr.placeholder]="placeHolder"></textarea>
                <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
                    {{validationMessage}}
                </small>
        </div>
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
	@Input() placeHolder: string = '';
    editor;
    activeClass: string = '';
    ngOnInit() {
        if (this.form.controls[this.formControlId].value == null)
            this.form.controls[this.formControlId].setValue('');
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId]) 
			this.activeClass = this.placeHolder !== '' || this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
    }
  ngAfterViewInit()
  {
      $('#' + this.elementId).trigger('autoresize').characterCounter();
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
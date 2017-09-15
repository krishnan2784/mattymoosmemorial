import { Component, Input, Output, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var tinymce: any;
declare var $: any;

@Component({
  selector: 'richtexteditor',
  template: `
    <div [formGroup]="form" *ngIf="form">
            <input type="hidden" formControlName="{{formControlId}}" *ngIf="formControlId">
            <div class="input-field">
                <textarea id="{{elementId}}" [attr.maxLength]="maxLength > 0 ? maxLength : null" [attr.data-length]="maxLength > 0 ? maxLength : null" [attr.disabled]="disabled ? disabled : null">{{value}}</textarea>
            </div>
    </div>`
})
export class RichTextEditorComponent implements OnInit, AfterViewInit, OnDestroy {
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
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table','autoresize'],
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
            const content = editor.getContent();
            this.value = content;
            this.form.controls[this.formControlId].patchValue(content, {});
            this.form.markAsDirty();
            this.onEditorKeyup.emit({ id: this.elementId, val: content });
        });
      },
      });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}

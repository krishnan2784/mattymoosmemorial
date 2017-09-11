import { Component, Input, Output, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var tinymce: any;
declare var $: any;

@Component({
  selector: 'editor',
  template: `
    <div [formGroup]="form" *ngIf="form">
        <div class="input-field">
              <label [attr.for]="elementId" class="{{activeClass}}">{{label}}</label>
              <textarea id="{{elementId}}" formControlName="{{formControlId}}" *ngIf="formControlId" class="materialize-textarea" [attr.maxLength]="maxLength > 0 ? maxLength : null" [attr.data-length]="maxLength > 0 ? maxLength : null" [attr.disabled]="disabled ? disabled : null"></textarea>
                <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
                    {{validationMessage}}
                </small>
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
        if (this.elementId == '')
            this.elementId = this.formControlId;
        if (this.form && this.form.controls[this.formControlId]) 
            this.activeClass = this.form.controls[this.formControlId].value.toString().length > 0 ? "active" : "";
    }
  ngAfterViewInit()
  {
    //tinymce.init({
    //  selector: '#' + this.elementId,
    //  plugins: ['link', 'paste', 'table','autoresize'],
    //  setup: editor => {
    //    this.editor = editor;
    //    editor.on('keyup', () => {
    //        const content = editor.getContent();
    //        this.value = content;
    //        this.formGroup.controls[this.elementId].patchValue(content, {});
    //        this.formGroup.markAsDirty();
    //        this.onEditorKeyup.emit({ id: this.elementId, val: content });
    //    });
    //  },
    //  });
      $('#' + this.elementId).trigger('autoresize').characterCounter();
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}

//`
//    <div [formGroup]="formGroup" *ngIf="formGroup">
//      <input type="hidden" formControlName="{{elementId}}" *ngIf="elementId" value={{value}}>
//    </div>
    
//<textarea id="{{elementId}}">{{value}}</textarea>`
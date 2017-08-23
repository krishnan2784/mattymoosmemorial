import { Component, Input, Output, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var tinymce: any;
declare var $: any;

@Component({
  selector: 'editor',
  template: `
    <div [formGroup]="formGroup" *ngIf="formGroup">
      <textarea id="{{elementId}}" formControlName="{{elementId}}" *ngIf="elementId" value={{value}} class="materialize-textarea" [attr.maxLength]="maxLength > 0 ? maxLength : null"></textarea>
    </div>`
})
export class RichTextEditorComponent implements  AfterViewInit, OnDestroy {
    @Input() elementId: string;
    @Input() value: string = '';
    @Input() formGroup: FormGroup;
    @Input() maxLength: number = 0;
    @Output() onEditorKeyup = new EventEmitter<any>();
  editor;
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
        $('#' + this.elementId).trigger('autoresize');

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
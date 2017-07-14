import { Component, Input, Output, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var tinymce: any;

@Component({
  selector: 'editor',
  template: `
    <div [formGroup]="formGroup" *ngIf="formGroup">
      <input type="hidden" formControlName="{{elementId}}" *ngIf="elementId" value={{value}}>
    </div>
    
<textarea id="{{elementId}}">{{value}}</textarea>`
})
export class RichTextEditorComponent implements  AfterViewInit, OnDestroy {
    @Input() elementId: string;
    @Input() value: string = '';
    @Input() formGroup: FormGroup;
    @Output() onEditorKeyup = new EventEmitter<any>();
  editor;
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
            this.formGroup.controls[this.elementId].patchValue(content, {  });
            this.onEditorKeyup.emit({ id: this.elementId, val: content });
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}

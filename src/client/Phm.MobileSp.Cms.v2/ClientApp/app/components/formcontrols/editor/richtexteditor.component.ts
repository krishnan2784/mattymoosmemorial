import { Component, Input, Output, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var tinymce: any;
declare var $: any;

@Component({
  selector: 'richtexteditor',
  template: `
    <div [formGroup]="form" *ngIf="form">
        <input type="hidden" formControlName="{{formControlId}}" *ngIf="formControlId">
        <label [class.active]="editing">{{label}}</label>
        <textarea id="{{elementId}}" [attr.disabled]="disabled ? disabled : null">
            {{value}}
        </textarea>
          <md-hint align="end" *ngIf="maxLength>0 && editing">{{currentChars}} / {{maxLength}}</md-hint>
        <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
            {{validationMessage}}
        </small>
        <div class="clearfix"></div>
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
    currentChars = 0;
    editor;
    editing: boolean = false;
    toggleEdit = this.toggleEditing.bind(this);
    
    ngOnInit() {
        if (this.form.controls[this.formControlId].value == null)
            this.form.controls[this.formControlId].setValue('');
        if (this.elementId == '')
            this.elementId = this.formControlId;
    }
  ngAfterViewInit() {
      this.initTinyMce();
  }
  initTinyMce() {
      tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table','autoresize'],
      setup: editor => {
          this.editor = editor;
          editor.on('keyup',
              () => {
                  const content = editor.getContent();
                  this.value = content;
                  this.form.controls[this.formControlId].patchValue(content, {});
                  this.form.markAsDirty();
                  this.onEditorKeyup.emit({ id: this.elementId, val: content });
              });
          editor.on('keydown',
              () => {
                  if (this.maxLength === 0)
                      return;
                  this.currentChars = $.trim(tinymce.activeEditor.getContent().replace(/(<([^>]+)>)/ig, "")).length;
                  if (this.currentChars > this.maxLength - 1) {
                      editor.stopPropagation();
                      editor.preventDefault();
                  }
              });
          editor.on('mousedown ',
              () => {
                  this.toggleEdit(true);
              });
          editor.on('blur',
              () => {
                  this.toggleEdit(false);
              });
          editor.on("init",
              (editor) => {
                  tinymce.get(this.elementId).setContent(this.form.controls[this.formControlId].value);
                  tinymce.execCommand('mceRepaint');
              }
          );
      },
    });
  }
  toggleEditing(currentlyEditing: boolean) {
     this.editing = currentlyEditing;
  }
  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}

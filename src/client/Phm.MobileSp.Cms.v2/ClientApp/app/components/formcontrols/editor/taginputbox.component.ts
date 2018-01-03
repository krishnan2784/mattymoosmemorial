import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var $: any;

@Component({
    selector: 'taginputbox',
  template: `
    <div [formGroup]="form" *ngIf="form">
          <input type="hidden" formControlName="{{formControlId}}">
        <mat-form-field>
            <div class="tag-contrainer">
                <input mdInput type="text" id="{{elementId}}" placeholder="{{label}}" data-role="tagsinput" value="{{form.controls[this.formControlId].value}}">
            </div>
            <mat-hint align="end" *ngIf="maxLength>0">{{form.controls[formControlId].value.length}} / {{maxLength}}</mat-hint>
            <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
                {{validationMessage}}
            </small>
        </mat-form-field>
    </div>
`,
  styles: [require('./taginputbox.component.css')]
})
export class TagInputComponent implements OnInit, AfterViewInit {
    @Input() form: FormGroup;
    @Input() formControlId: string;
    @Input() elementId: string = '';
    @Input() label: string = '';
    @Input() validationMessage: string = '';
    @Input() formSubmitted: boolean = false;
    @Input() maxLength: number = 0;
    activeClass: string = '';

    ngOnInit() {
        if (this.elementId === '')
            this.elementId = this.formControlId;
    }
    ngAfterViewInit() {
        $('#' + this.elementId).tagsinput({
            trimValue: true,
            maxTags: this.maxLength,
            tagClass: 'primaryBackgroundColour'
            // we can use this to get a list of tags for autofilling
            //, typeahead: {
            //    source: (query) => {
            //        return $.get('http://someservice.com');
            //    }
            //}
        });
        $('.tag-contrainer input').keydown((event) => {
            if (event.keyCode == 13) {
                event.preventDefault();
                $('#' + this.elementId).tagsinput('add', $('.tag-contrainer input').val());
                $('.tag-contrainer input').val('');
            }
        });
        $('#' + this.elementId).on('itemAdded', (event) => {
            this.setFormValue();
        });
        $('#' + this.elementId).on('itemRemoved', (event) => {
            this.setFormValue();
        });
    }
    setFormValue() {
        this.form.controls[this.formControlId].setValue($('#' + this.elementId).val());
    }
}

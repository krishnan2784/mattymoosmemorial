import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var $: any;

@Component({
    selector: 'taginputbox',
  template: `
    <div [formGroup]="form" *ngIf="form">
        <div class="input-field">
            <label [attr.for]="elementId" class="active">{{label}}</label>
            <input type="hidden" formControlName="{{formControlId}}">
            <div class="tag-contrainer">
                <input type="text" id="{{elementId}}" data-role="tagsinput" value="{{form.controls[this.formControlId].value}}">
            </div>
            <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
                {{validationMessage}}
            </small>
        </div>
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
		$('.bootstrap-tagsinput input').attr('id', 'input__' + this.elementId);
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

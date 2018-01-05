import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var $: any;

//bootstrap-tagsinput

@Component({
    selector: 'taginputbox',
    template: `
    <div [formGroup]="form" *ngIf="form">
      <mat-form-field>
        <input type="hidden" formControlName="{{formControlId}}">
        <div class="tag-contrainer">
          <input matInput type="text" id="{{elementId}}" placeholder="{{label}}" data-role="tagsinput" value="{{form.controls[this.formControlId].value}}">
        </div>
        <small class="active-warning" [class.hidden]="form.controls[formControlId].valid || !formSubmitted">
          {{validationMessage}}
        </small>
        <small *ngIf="displayMaxWarn" class="active-warning">
          You can not enter more than {{maxLength}} tags.
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
	displayMaxWarn = false;

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
		    if (event.keyCode == 13 || event.keyCode == 188) {
			    event.preventDefault();
			    $('#' + this.elementId).tagsinput('add', $('.tag-contrainer input').val().replace(',', ''));
			    $('.tag-contrainer input').val('');
		    }
		});
	    $('.tag-contrainer input').keyup((event) => {
		    this.displayMaxWarn =
			    $('.tag-contrainer .tag').length > this.maxLength - 1 && $('.tag-contrainer input').val() !== '';
	    });
	    var self = this;
	    $('#' + this.elementId).on('beforeItemAdd', function (event) {
			if ($('.tag-contrainer input').val().indexOf(',') > -1) {
				event.cancel = true;
				var tags = $('.tag-contrainer input').val().split(',');
				$('.tag-contrainer input').val('');
				tags.forEach(tag => {
					$('#' + self.elementId).tagsinput('add', tag);
				});
				
			}
	    });
        $('#' + this.elementId).on('itemAdded', (event) => {
			this.setFormValue();
	        $('.tag-contrainer input').val('');
        });
        $('#' + this.elementId).on('itemRemoved', (event) => {
            this.setFormValue();
        });
    }
    setFormValue() {
        this.form.controls[this.formControlId].setValue($('#' + this.elementId).val());
    }
}

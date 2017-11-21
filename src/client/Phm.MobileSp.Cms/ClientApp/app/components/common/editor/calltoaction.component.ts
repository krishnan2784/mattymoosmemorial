import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
declare var $: any;

@Component({
	selector: 'calltoaction',
	styles: [`
.no-pad, .url-container, .additional-info{
padding: 0;
}
.button-label-container{
padding-left: 0;
}
.additional-info{
margin-top: 15px;
}
.button{
	margin-top: 15px;
}
    a span {
cursor:pointer;
    }
  `],
  template: `
    <div [formGroup]="form" *ngIf="form">
	        <h5 *ngIf="title">{{title}}</h5>
	        <div class="col-md-9 no-pad">
		        <div class="col-md-4 button-label-container">
			        <textinput [form]="form" [formSubmitted]="formSubmitted"
			                   [formControlId]="buttonLabelFormControlId"
			                   [elementId]="buttonLabelElementId"
			                   [label]="buttonLabelLabel"
							   [maxLength]="16"></textinput>
		        </div>
		        <div class="col-md-8 url-container">
			        <textinput [form]="form" [formSubmitted]="formSubmitted"
			                   [formControlId]="urlFormControlId"
			                   [elementId]="urlElementId"
			                   [label]="urlLabel"></textinput>
		        </div>
		        <div class="clearfix"></div>
		        <small *ngIf="additionalInfo" class="col-lg-12 additional-info">
			        {{additionalInfo}}
		        </small>
	        </div>
	        <div class="col-md-3">
		        <a class="button btn" *ngIf="form.controls[urlFormControlId].value && form.controls[urlFormControlId].value.length>5" 
		           href="{{form.controls[urlFormControlId].value.indexOf('http') === 0 ? form.controls[urlFormControlId].value : 'http://' + form.controls[urlFormControlId].value}}" target="_blank">
			        <span [innerHtml]="form.controls[buttonLabelFormControlId].value && form.controls[buttonLabelFormControlId].value.length > 0 ? form.controls[buttonLabelFormControlId].value : 'Test URL'"></span>
		        </a>
	        </div>
	        <div class="clearfix"></div>
    </div>
`
})
export class CallToActionComponent implements OnInit {
	@Input() title: string;
	@Input() additionalInfo: string;
	@Input() form: FormGroup;

	@Input() buttonLabelFormControlId: string;
	@Input() buttonLabelLabel: string = '';
	@Input() buttonLabelElementId: string;

	@Input() urlFormControlId: string;
	@Input() urlLabel: string = '';
	@Input() urlElementId: string;
	
	@Input() formSubmitted: boolean = false;

	ngOnInit() {

    }
}

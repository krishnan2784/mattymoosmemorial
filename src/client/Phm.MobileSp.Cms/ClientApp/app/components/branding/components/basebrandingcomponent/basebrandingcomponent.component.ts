import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {BrandingElement} from "../../../../models/brandingclasses";
import {BrandingElementType} from "../../../../enums";

@Component({
    selector: 'base-branding-component',
    template: require('./basebrandingcomponent.component.html'),
    styles: [require('./basebrandingcomponent.component.css')]
})
export class BaseBrandingComponent implements OnInit {
  @Output()
  public componentUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public model: BrandingElement;
  @Input()
  public form: FormGroup;
	@Input()
  public submitted: boolean;
	@Input()
	public index: number;
  brandingElementType: typeof BrandingElementType = BrandingElementType;

  constructor() {

  }

	ngOnInit() {
		console.log(this.form);
		console.log(this.model);
	}

}

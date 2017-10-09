import { Component, Input } from '@angular/core';
import {BrandingElement} from "../../../models/brandingclasses";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
    selector: 'branding-section',
    template: require('./brandingcontentsection.component.html'),
    styles: [require('./brandingcontentsection.component.css')]
})
export class BrandingContentSectionComponent {
  @Input()
  public model: BrandingElement[];
  @Input()
  public form: FormGroup;
  @Input()
  public submitted: boolean;
  constructor(public fb: FormBuilder) {
  }
  addFormControls() {
    var formArray = new FormArray([], <any>Validators.minLength(2));
    this.model.baseFeedPages.forEach((x, i) => formArray.push(this.initPage(x)));
    this.form.addControl('baseFeedPages', formArray);
    this.form.controls['baseFeedPages'].setValidators([Validators.required, Validators1.minLengthArray(2), Validators.maxLength(5)]);
  };
}

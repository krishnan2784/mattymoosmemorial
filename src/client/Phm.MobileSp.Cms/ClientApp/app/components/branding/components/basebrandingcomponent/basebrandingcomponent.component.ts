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
  public form: FormGroup;
  public submitted: boolean;

  @Output()
  public componentUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public model: BrandingElement;
  brandingElementType: typeof BrandingElementType = BrandingElementType;

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
    this.initialiseForm();
  }

  public initialiseForm() {
    this.form = this.fb.group({
      id: [this.model.id, []],
      masterId: [this.model.masterId, []],
      order: [this.model.order, []],
      enabled: [this.model.enabled, []],
      published: [this.model.published, []],
      createdAt: [this.model.createdAt, []],
      updatedAt: [this.model.updatedAt, []],
      //groupDescription: [this.model.groupDescription, []],
      //key: [this.model.key, []],
      //elementType: [this.model.elementType, []],
      //description: [this.model.description, []],
      value: [this.model.value, []],
      primaryImageId: [this.model.primaryImageId, []],
      secondaryImageId: [this.model.secondaryImageId, []]
    });
  } 
}

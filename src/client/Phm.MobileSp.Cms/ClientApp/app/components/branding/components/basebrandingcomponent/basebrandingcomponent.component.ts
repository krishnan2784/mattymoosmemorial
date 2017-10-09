import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'base-branding-component',
    template: require('./basebrandingcomponent.component.html'),
    styles: [require('./basebrandingcomponent.component.css')]
})
export class BaseBrandingComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean;

  @Output()
  public feedUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public model;

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
    this.initialiseForm();
  }

  public initialiseForm() {
    this.form = this.fb.group({
      id: ['', []],
      masterId: ['', []],
      enabled: ['', []],
      published: ['', []],
      createdAt: ['', []],
      updatedAt: ['', []]
    });
  } 
}

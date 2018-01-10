import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'bodytext-page-form',
    template: require('./bodytextpageform.component.html'),
    styles: [require('./bodytextpageform.component.css')]
})
export class BodyTextPageFormComponent implements OnInit, OnDestroy {

    @Input('form')
    public form: FormGroup;

    @Input('model')
    public model;

    @Input('index')
    public index: number;

    @Input()
    public submitted: boolean; 

    @Input()
    public isVisible: boolean; 

    ngOnInit() {
        this.addFormControls();
    }

    ngOnDestroy() {
        this.removeFormControls();
    }
    
    addFormControls() {
        this.form.addControl('bodyText', new FormControl(this.model.bodyText, [<any>Validators.required]));
    };

    removeFormControls() {
        this.form.removeControl('bodyText');
    };

}

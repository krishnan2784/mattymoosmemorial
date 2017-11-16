import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'competition-form',
	template: require('./competitionform.component.html'),
	styles: [require('./competitionform.component.css')]
})
export class CompetitionForm implements OnInit {
	@Output()
	public competitionUpdated: EventEmitter<any> = new EventEmitter<any>();

	@Input()
	public model: any;
	public form: FormGroup;

	navbarData;
	currentStep;
	loading: boolean = false;

	constructor(public _fb: FormBuilder) {

	}

	ngOnInit() {
		this.setupSteps();
		this.initialiseForm();
	}

	public initialiseForm() {
		this.form = this._fb.group({
			id: [this.model.id, []],
			title: [this.model.title, [<any>Validators.required, <any>Validators.maxLength(160)]]
		});
	} 

	setupSteps() {
		this.navbarData = [{ id: 'description', text: 'Description' },
			{ id: 'settings', text: 'Settings' }];
		this.currentStep = 'description';
	}

	updateCurrentStep(step) {
		this.currentStep = step;
	}

	save(competition, isValid: boolean) {
		this.loading = true;
		console.log(competition);
		this.loading = false;
	}

	goBack() {
		this.competitionUpdated.emit(null);
	}
}

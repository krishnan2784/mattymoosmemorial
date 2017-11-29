import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TermsAndCondition } from "../../../../models/competitionclasses";
import {FormEx} from "../../../../classes/helpers/form";
import {ShareService} from "../../../../services/helpers/shareservice";
import {TermsAndConditionsDataService} from "../../../../services/termsandconditionsdataservice";


declare var $: any;
declare var Materialize: any;
@Component({
	selector: 'terms-and-conditions-form',
	template: require('./termsandconditionsform.component.html'),
	styles: [require('./termsandconditionsform.component.css')]
})
export class TermsAndConditionForm implements OnInit {
	@Output()
	public termsAndConditionsUpdated: EventEmitter<TermsAndCondition> = new EventEmitter<TermsAndCondition>();

	@Input()
	public model: TermsAndCondition;
	public form: FormGroup;

	navbarData;
	currentStep;
	submitted: boolean = false;
	loading: boolean = false;

	constructor(public _fb: FormBuilder, public sharedService: ShareService,
		public termsAndConditionsDataService: TermsAndConditionsDataService) {

	}

	ngOnInit() {
		console.log(this.model);
		this.setupSteps();
		this.getData();
		this.initialiseForm();
	}

	getData() {
		this.model = new TermsAndCondition(this.model);
	}

	public initialiseForm() {
		this.form = this._fb.group({
			id: [this.model.id, []],
			title: [this.model.title, [<any>Validators.required, <any>Validators.maxLength(160)]],
			fullDescription: [this.model.fullDescription, [<any>Validators.required]]
		});
	} 

	setupSteps() {
		this.navbarData = [{ id: 'description', text: 'Description' }];
		this.currentStep = 'description';
	}

	updateCurrentStep(step) {
		this.currentStep = step;
	}
	
	save(termsAndConditions: TermsAndCondition, isValid: boolean) {
		this.submitted = true;
		if (!this.form.valid) {
			console.log(FormEx.getFormValidationErrors(this.form));
			$('.toast').remove();
			return Materialize.toast('Please check that you have filled in all the required fields.', 6000, 'red');
		}
		this.loading = true;
		this.termsAndConditionsDataService.updateTermsAndCondition(termsAndConditions).subscribe(result => {
			if (result.success) {
				this.termsAndConditionsUpdated.emit(result.content);
			} else
				this.loading = false;
		});
	}

	goBack() {
		this.termsAndConditionsUpdated.emit(null);
	}
}

import { Component, Output, EventEmitter, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { PositionXBoosterRewardScheme, PositionXBoosterItem } from "../../../../models/competitionclasses";
import { CompetitionsDataService } from "../../../../services/competitionsdataservice";
import {FormEx} from "../../../../classes/helpers/form";
import {ShareService} from "../../../../services/helpers/shareservice";
import {UploaderType} from "../../../../enums";
import {TermsAndConditionsDataService} from
	"../../../../services/termsandconditionsdataservice";
import {RewardSchemesDataService} from "../../../../services/rewardschemedataservice";


declare var $: any;
declare var Materialize: any;
@Component({
	selector: 'reward-scheme-form',
	template: require('./rewardschemeform.component.html'),
	styles: [require('./rewardschemeform.component.css')],
	encapsulation: ViewEncapsulation.None
})
export class RewardSchemeForm implements OnInit {
	@Output()
	public rewardSchemeUpdated: EventEmitter<PositionXBoosterRewardScheme> = new EventEmitter<PositionXBoosterRewardScheme>();

	@Input()
	public model: PositionXBoosterRewardScheme;
	public form: FormGroup;

	navbarData;
	currentStep;
	submitted: boolean = false;
	loading: boolean = false;
	rewardScheme: { name: string, value: any }[] = [];
	termsAndConditions: { name: string, value: any }[] = [];

	constructor(public _fb: FormBuilder, public sharedService: ShareService,
		public rewardSchemesDataService: RewardSchemesDataService) {

	}

	ngOnInit() {
		console.log(this.model);
		this.setupSteps();
		this.getData();
		this.initialiseForm();
	}

	getData() {
		this.model = new PositionXBoosterRewardScheme(this.model);
	}

	public initialiseForm() {
		var formArray = new FormArray([], Validators.minLength(1));
		this.model.items.forEach(x => formArray.push(this.initItem(x)));
		this.form = this._fb.group({
			id: [this.model.id, []],
			title: [this.model.title, [<any>Validators.required, <any>Validators.maxLength(160)]],
			about: [this.model.about, []],
			items: formArray
		});
	} 

	initItem(condition: PositionXBoosterItem = new PositionXBoosterItem()) {
		return new FormGroup({
			id: new FormControl(condition.id, []),
			enabled: new FormControl(condition.enabled, []),
			published: new FormControl(condition.published, []),
			positionXBoosterRewardSchemeId: new FormControl(condition.positionXBoosterRewardSchemeId, []),
			startPosition: new FormControl(condition.startPosition, [<any>Validators.required]),
			endPosition: new FormControl(condition.endPosition, [<any>Validators.required]),
			xBooster: new FormControl(condition.xBooster, [<any>Validators.required])
		});
	}

	setupSteps() {
		this.navbarData = [{ id: 'description', text: 'Description' }];
		this.currentStep = 'description';
	}

	updateCurrentStep(step) {
		this.currentStep = step;
	}

	addCondition() {
		const control = <FormArray>this.form.controls['items'];
		control.push(this.initItem());
	}

	removeCondition(index) {
		const control = <FormArray>this.form.controls['items'];
		control.removeAt(index);
		this.form.markAsDirty();
	}
	
	save(rewarScheme: PositionXBoosterRewardScheme, isValid: boolean) {
		this.submitted = true;
		if (!this.form.valid) {
			console.log(FormEx.getFormValidationErrors(this.form));
			$('.toast').remove();
			return Materialize.toast('Please check that you have filled in all the required fields.', 6000, 'red');
		}
		console.log(this.model);
		console.log(rewarScheme);
		this.loading = true;
		this.rewardSchemesDataService.updateRewardScheme(rewarScheme).subscribe(result => {
			if (result.success) {
				this.model = result.content;
				this.rewardSchemeUpdated.emit(result.content);
			} else
				this.loading = false;

		});
	}

	goBack() {
		this.rewardSchemeUpdated.emit(null);
	}
}

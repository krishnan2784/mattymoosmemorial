import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Competition } from "../../../../models/competitionclasses";
import {FormEx} from "../../../../classes/helpers/form";
import {UploaderType} from "../../../../../enums";
import {ShareService} from "../../../../shared/services/helpers/shareservice";
import {CompetitionsDataService} from "../../../../shared/services/competitionsdataservice";
import {TermsAndConditionsDataService} from "../../../../shared/services/termsandconditionsdataservice";
import {RewardSchemesDataService} from "../../../../shared/services/rewardschemedataservice";
import { AlertService } from '../../../../shared/services/helpers/alertservice';

@Component({
	selector: 'competition-form',
	template: require('./competitionform.component.html'),
	styles: [require('./competitionform.component.css')]
})
export class CompetitionForm implements OnInit {
	@Output()
	public competitionUpdated: EventEmitter<Competition> = new EventEmitter<Competition>();

	@Input()
	public model: Competition;
	public form: FormGroup;

	navbarData;
	currentStep;
	submitted: boolean = false;
	loading: boolean = false;
	uploaderTypes: typeof UploaderType = UploaderType;
	rewardScheme: { name: string, value: any }[] = [];
	termsAndConditions: { name: string, value: any }[] = [];

	constructor(public _fb: FormBuilder, public sharedService: ShareService,
		public competitionService: CompetitionsDataService, public termsAndConditionsDataService: TermsAndConditionsDataService,
		public rewardSchemesDataService: RewardSchemesDataService, public alertService:AlertService) {

	}

	ngOnInit() {
		this.setupSteps();
		this.getData();
		this.initialiseForm();
	}

	getData() {
		this.model = new Competition(this.model);
		this.termsAndConditionsDataService.getTermsAndConditions().subscribe(result => {
			if (result)
				this.termsAndConditions = result.map(x => {
					return { name: x.title, value: x.id };
				});
		});
		this.rewardSchemesDataService.getRewardScheme().subscribe(result => {
			if (result)
				this.rewardScheme = result.map(x => {
					return { name: x.title, value: x.id };
				});
		});
	}

	public initialiseForm() {
		this.form = this._fb.group({
			id: [this.model.id, []],
			published: [this.model.published, []],
			title: [this.model.title, [<any>Validators.required, <any>Validators.maxLength(160)]],
			about: [this.model.about, [<any>Validators.required]],
			mainImageId: [this.model.mainImageId, []],
			makeImageLink: [this.model.makeImageLink, []],
			linkUrl: [this.model.linkUrl, []],
			linkTitle: [this.model.linkTitle, []],
			baseRewardSchemeId: [this.model.baseRewardSchemeId, [<any>Validators.required]],
			termsAndConditionId: [this.model.termsAndConditionId, [<any>Validators.required]],
			startDate: [this.model.startDate, [<any>Validators.required]],
			endDate: [this.model.endDate, [<any>Validators.required]],
			activeImageId: [this.model.activeImageId, [<any>Validators.required]],
			makeActiveImageLink: [this.model.makeActiveImageLink, []],
			completedImageId: [this.model.completedImageId, [<any>Validators.required]],
			makeCompletedImageLink: [this.model.makeCompletedImageLink, []]
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
	
	save(competition: Competition, isValid: boolean) {
		this.submitted = true;
		if (!this.form.valid) {
      console.log(FormEx.getFormValidationErrors(this.form));
		  this.alertService.displaySuccessFailAlert('Please check that you have filled in all the required fields.', false);
		  return;
		}
		this.loading = true;
		this.competitionService.updateCompetition(competition).subscribe(result => {
			if (result.success) {
				this.competitionUpdated.emit(result.content);
			} else
				this.loading = false;
		});
	}

	goBack() {
		this.competitionUpdated.emit(null);
	}
}

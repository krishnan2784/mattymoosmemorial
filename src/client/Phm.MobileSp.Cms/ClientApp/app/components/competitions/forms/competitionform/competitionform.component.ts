import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Competition} from "../../../../models/competitionclasses";
import { CompetitionsDataService } from "../../../../services/competitionsdataservice";
import {FormEx} from "../../../../classes/helpers/form";
import {ShareService} from "../../../../services/helpers/shareservice";
import {UploaderType} from "../../../../enums";


declare var $: any;
declare var Materialize: any;
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
	loading: boolean = false;
	uploaderTypes: typeof UploaderType = UploaderType;

	constructor(public _fb: FormBuilder, public sharedService: ShareService, public competitionService: CompetitionsDataService) {

	}

	ngOnInit() {
		this.setupSteps();
		this.initialiseForm();
	}

	public initialiseForm() {
		this.form = this._fb.group({
			id: [this.model.id, []],
			title: [this.model.title, [<any>Validators.required, <any>Validators.maxLength(160)]],
			about: [this.model.about, [<any>Validators.required]],
			mainImageId: [this.model.mainImageId, []],
			makeImageLink: [this.model.makeImageLink, []],
			linkUrl: [this.model.linkUrl, []],
			linkTitle: [this.model.linkTitle, []],
			baseRewardSchemeId: [this.model.baseRewardSchemeId, []],
			termsAndConditionId: [this.model.termsAndConditionId, []],
			startDate: [this.model.startDate, []],
			endDate: [this.model.endDate, []],
			activeImageId: [this.model.activeImageId, []],
			makeActiveImageLink: [this.model.makeActiveImageLink, []],
			completedImageId: [this.model.completedImageId, []],
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

	checkbox() {
		console.log('hi', this.form.controls.makeImageLink);
		this.form.controls.makeImageLink.patchValue(true, { onlySelf: true });
	}

	save(competition: Competition, isValid: boolean) {
		if (!this.form.valid) {
			console.log(FormEx.getFormValidationErrors(this.form));
			$('.toast').remove();
			return Materialize.toast('Please check that you have filled in all the required fields.', 6000, 'red');
		}
		this.loading = true;
		this.competitionService.updateCompetition(competition).subscribe(result => {
			if (result.success) {
				this.model = result.content;
				this.sharedService.updateFeedItem(result.content);
				this.competitionUpdated.emit(result.content);
			} else
				this.loading = false;

		});
	}

	goBack() {
		this.competitionUpdated.emit(null);
	}
}

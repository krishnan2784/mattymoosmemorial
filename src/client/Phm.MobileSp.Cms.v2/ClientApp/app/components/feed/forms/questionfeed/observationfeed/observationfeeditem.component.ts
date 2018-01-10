import { Component, Injector } from '@angular/core';
import { FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import {BaseQuestionFeedItemFormComponent} from "../basequestionfeeditem.component";
import {IFeedItemPartialForm} from "../../../../../contracts/components/IFeedItemComponents";
import {ObservationFeed} from "../../../../../models/feedclasses";
import {FeedTypeEnum, SurveyQuestionTypeEnum } from "../../../../../../enums";
import {minValue} from "../../../../../classes/validators";
import {UserObservation} from "../../../../../models/observationclasses";
import {SurveyQuestion, SurveyQuestionAnswer } from "../../../../../models/surveyclasses";


@Component({
    selector: 'observationfeeditem',
    template: require('../basequestionfeeditem.component.html'),
    styles: [require('../basequestionfeeditem.component.css')]
})
export class ObservationFeedItemFormComponent extends BaseQuestionFeedItemFormComponent implements IFeedItemPartialForm {
    model: ObservationFeed;

    constructor(injector: Injector) {
        super(injector, ObservationFeed, FeedTypeEnum.Observation, SurveyQuestionTypeEnum);
        if (this.model) {
            this.model.points = null;
            this.form.controls['points'].patchValue(this.model.points, { onlySelf: true });
        }
    }
    
    addFormControls() {
        var formArray = new FormArray([], Validators.minLength(1));
        this.model.questions.forEach(x => formArray.push(this.initQuestion(x)));
        this.form.addControl('questions', formArray);

        var userFormArray = new FormArray([]);
        this.model.userObservations.forEach(x => userFormArray.push(this.initUserObservation(x)));
        this.form.addControl('userObservations', userFormArray);
        this.form.addControl('surveyDescription', new FormControl(this.model.surveyDescription, []));
        this.form.addControl('completionMessage', new FormControl(this.model.completionMessage, []));
        this.form.controls['mainIconId'].setValidators(null);
        this.form.controls['readingTime'].setValidators(null);
        this.form.controls['points'].setValidators(null);
    };
    
    removeFormControls() {
        this.form.removeControl('questions');
        this.form.removeControl('userObservations');
        this.form.removeControl('surveyDescription');
        this.form.removeControl('completionMessage');
        this.form.controls['mainIconId'].setValidators(Validators.required);
        this.form.controls['readingTime'].setValidators([Validators.required, minValue(1)]);
        this.form.controls['points'].setValidators([Validators.required, minValue(1)]);
    };

    initUserObservation(userObservation: UserObservation = new UserObservation()) {
        var fg = new FormGroup({
            feedId: new FormControl(userObservation.feedId, []),
            userId: new FormControl(userObservation.userId, []),
            user: new FormGroup({
                id: new FormControl(userObservation.user.id, []),
                userName: new FormControl(userObservation.user.userName, [])
            })
        });
        return fg;
    }

    initQuestion(question: SurveyQuestion = new SurveyQuestion()) {
        question = new SurveyQuestion(question);
        var fg = this.baseQuestionForm(question);
        fg.addControl('surveyFeedId', new FormControl(question.surveyFeedId, []));
        return fg;
    }
    
    initAnswer(answer: SurveyQuestionAnswer = new SurveyQuestionAnswer()) {
        answer = new SurveyQuestionAnswer(answer);
        var fg = this.baseAnswerForm(answer);
        fg.addControl('surveyQuestionId', new FormControl(answer.surveyQuestionId, []));
        fg.addControl('isFreeText', new FormControl(answer.isFreeText, []));
        return fg;
    }

}

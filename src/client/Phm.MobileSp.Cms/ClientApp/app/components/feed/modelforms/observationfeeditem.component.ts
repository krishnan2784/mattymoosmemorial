import { Component, Injector } from '@angular/core';
import { FormControl, FormArray, Validators, FormGroup } from '@angular/forms'
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import SurveyClasses = require("../../../models/surveyclasses");
import Basequestionfeeditemcomponent = require("./basequestionfeeditem.component");
import BaseQuestionFeedItemFormComponent = Basequestionfeeditemcomponent.BaseQuestionFeedItemFormComponent;
import Observationclasses = require("../../../models/observationclasses");
import UserObservation = Observationclasses.UserObservation;

@Component({
    selector: 'observationfeeditem',
    template: require('./basequestionfeeditem.component.html'),
    styles: [require('./basequestionfeeditem.component.css')]
})
export class ObservationFeedItemFormComponent extends BaseQuestionFeedItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.ObservationFeed;

    constructor(injector: Injector) {
        super(injector, Feedclasses.ObservationFeed, '/api/Feed/UpdateObservationFeedItem', FeedTypeEnum.Observation, Enums.SurveyQuestionTypeEnum);
        if (this.model) {
            this.model.points = null;
            this.form.controls['points'].patchValue(this.model.points, { onlySelf: true });
        }
    }
    
    addFormControls() {
        var formArray = new FormArray([], Validators.required);
        this.model.questions.forEach(x => formArray.push(this.initQuestion(x)));
        this.form.addControl('questions', formArray);

        var userFormArray = new FormArray([]);
        this.model.userObservations.forEach(x => userFormArray.push(this.initUserObservation(x)));
        this.form.addControl('userObservations', userFormArray);
        this.form.addControl('surveyDescription', new FormControl(this.model.surveyDescription, [<any>Validators.required, <any>Validators.minLength(5)]));
        this.form.addControl('completionMessage', new FormControl(this.model.completionMessage, [<any>Validators.required, <any>Validators.minLength(5)]));
        this.form.controls['mainIconId'].setValidators(null);
        this.form.controls['readingTime'].setValidators(Validators.required);
        this.form.controls['points'].setValidators(Validators.required);
    };
    
    removeFormControls() {
        this.form.removeControl('questions');
        this.form.removeControl('userObservations');
        this.form.removeControl('surveyDescription');
        this.form.removeControl('completionMessage');
        this.form.controls['mainIconId'].setValidators(Validators.required);
        this.form.controls['readingTime'].setValidators(null);
        this.form.controls['points'].setValidators(null);

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

    initQuestion(question: SurveyClasses.SurveyQuestion = new SurveyClasses.SurveyQuestion()) {
        var fg = this.baseQuestionForm(question);
        fg.addControl('surveyFeedId', new FormControl(question.surveyFeedId, []));
        return fg;
    }

    initAnswer(answer: SurveyClasses.SurveyQuestionAnswer = new SurveyClasses.SurveyQuestionAnswer()) {
        var fg = this.baseAnswerForm(answer);
        fg.addControl('surveyQuestionId', new FormControl(answer.surveyQuestionId, []));
        fg.addControl('isFreeText', new FormControl(answer.isFreeText, []));
        return fg;
    }

}
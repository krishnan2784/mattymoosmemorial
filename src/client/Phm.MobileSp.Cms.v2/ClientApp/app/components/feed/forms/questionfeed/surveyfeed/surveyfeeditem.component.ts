import { Component, Injector } from '@angular/core';
import { FormControl, FormArray, Validators } from '@angular/forms';
import {BaseQuestionFeedItemFormComponent} from "../basequestionfeeditem.component";
import {IFeedItemPartialForm} from "../../../../../contracts/components/IFeedItemComponents";
import {SurveyFeed} from "../../../../../models/feedclasses";
import {FeedTypeEnum, SurveyQuestionTypeEnum } from "../../../../../../enums";
import {SurveyQuestion, SurveyQuestionAnswer } from "../../../../../models/surveyclasses";


@Component({
    selector: 'surveyfeeditem',
    template: require('../basequestionfeeditem.component.html'),
    styles: [require('../basequestionfeeditem.component.css')]
})
export class SurveyFeedItemFormComponent extends BaseQuestionFeedItemFormComponent implements IFeedItemPartialForm {
    model: SurveyFeed;
    constructor(injector: Injector) {
        super(injector, SurveyFeed, FeedTypeEnum.Survey, SurveyQuestionTypeEnum);
    }

    //constructor(injector: Injector, feedModelType: any = Feedclasses.SurveyFeed, updateUrl: string = '/api/Feed/UpdateSurveyFeedItem',
    //    feedType: Enums.FeedTypeEnum = FeedTypeEnum.Survey, questionTypeEnum: any = Enums.SurveyQuestionTypeEnum) {
    //    super(injector, feedModelType, updateUrl, feedType, questionTypeEnum);
    //}

    addFormControls() {
        var formArray = new FormArray([], Validators.minLength(1));
        this.model.questions.forEach(x => formArray.push(this.initQuestion(x)));
        this.form.addControl('questions', formArray);
        this.form.addControl('surveyDescription', new FormControl({value:this.model.surveyDescription, disabled: true}, []));
        this.form.addControl('completionMessage', new FormControl({value:this.model.completionMessage, disabled: true}, []));
        this.form.controls['mainIconId'].setValidators(null);
    };
    
    removeFormControls() {
        this.form.removeControl('questions');
        this.form.removeControl('surveyDescription');
        this.form.removeControl('completionMessage');
        this.form.controls['mainIconId'].setValidators(Validators.required);
        
    };

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

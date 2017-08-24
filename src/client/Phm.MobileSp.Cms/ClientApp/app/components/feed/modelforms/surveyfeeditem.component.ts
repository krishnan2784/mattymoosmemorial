import { Component, Injector } from '@angular/core';
import { FormControl, FormArray, Validators } from '@angular/forms'
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import SurveyClasses = require("../../../models/surveyclasses");
import Basequestionfeeditemcomponent = require("./basequestionfeeditem.component");
import BaseQuestionFeedItemFormComponent = Basequestionfeeditemcomponent.BaseQuestionFeedItemFormComponent;

@Component({
    selector: 'surveyfeeditem',
    template: require('./basequestionfeeditem.component.html'),
    styles: [require('./basequestionfeeditem.component.css')]
})
export class SurveyFeedItemFormComponent extends BaseQuestionFeedItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.SurveyFeed;
    constructor(injector: Injector) {
        super(injector, Feedclasses.SurveyFeed, '/api/Feed/UpdateSurveyFeedItem', FeedTypeEnum.Survey, Enums.SurveyQuestionTypeEnum);
    }

    //constructor(injector: Injector, feedModelType: any = Feedclasses.SurveyFeed, updateUrl: string = '/api/Feed/UpdateSurveyFeedItem',
    //    feedType: Enums.FeedTypeEnum = FeedTypeEnum.Survey, questionTypeEnum: any = Enums.SurveyQuestionTypeEnum) {
    //    super(injector, feedModelType, updateUrl, feedType, questionTypeEnum);
    //}

    addFormControls() {
        var formArray = new FormArray([], Validators.minLength(1));
        this.model.questions.forEach(x => formArray.push(this.initQuestion(x)));
        this.form.addControl('questions', formArray);
        this.form.addControl('surveyDescription', new FormControl(this.model.surveyDescription, []));
        this.form.addControl('completionMessage', new FormControl(this.model.completionMessage, []));
        this.form.controls['mainIconId'].setValidators(null);
    };
    
    removeFormControls() {
        this.form.removeControl('questions');
        this.form.removeControl('surveyDescription');
        this.form.removeControl('completionMessage');
        this.form.controls['mainIconId'].setValidators(Validators.required);
        
    };

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
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms'
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import { QuizQuestion } from "../../../models/quizclasses";
import { QuizQuestionAnswer } from "../../../models/quizclasses";
import { SurveyQuestion } from "../../../models/surveyclasses";
import { SurveyQuestionAnswer } from "../../../models/surveyclasses";

@Component({
    selector: 'question',
    template: require('./questionform.component.html'),
    styles: [require('./questionform.component.css')]
})
export class QuestionFormComponent {

    @Input('feedType')
    public feedType: FeedTypeEnum;

    @Input('form')
    public form: FormGroup;

    @Input('model')
    public model: any;

    @Input('index')
    public index: number;

    constructor() {
        if (!this.model || this.model.id === 0) {
            switch (this.feedType) {
            case Enums.FeedTypeEnum.Quiz:
                this.model = new QuizQuestion({
                    'Order': this.index,
                    'Answers': {
                        0: new QuizQuestionAnswer({ 'Order': 0 }),
                        1: new QuizQuestionAnswer({ 'Order': 1 })
                    }
                });
            case Enums.FeedTypeEnum.Survey:
                this.model = new SurveyQuestion({
                    'Order': this.index,
                    'Answers': {
                        0: new SurveyQuestionAnswer({ 'Order': 0 }),
                        1: new SurveyQuestionAnswer({ 'Order': 1 })
                    }
                });
            }
        }
    } 


    
}
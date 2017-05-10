import { Component, Injector } from '@angular/core';
import {  FormControl, FormArray, Validators } from '@angular/forms'
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import QuizClasses = require("../../../models/quizclasses");
import Basequestionfeeditemcomponent = require("./basequestionfeeditem.component");
import BaseQuestionFeedItemFormComponent = Basequestionfeeditemcomponent.BaseQuestionFeedItemFormComponent;

@Component({
    selector: 'quizfeeditem',
    template: require('./basequestionfeeditem.component.html'),
    styles: [require('./basequestionfeeditem.component.css')]
})
export class QuizFeedItemFormComponent extends BaseQuestionFeedItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.QuizFeed;
    questionType: typeof Enums.QuizQuestionTypeEnum = Enums.QuizQuestionTypeEnum;
    constructor(injector: Injector) {
        super(injector, Feedclasses.QuizFeed, '/api/Feed/UpdateQuizFeedItem', FeedTypeEnum.Quiz, Enums.QuizQuestionTypeEnum);
    }

    addFormControls() {
        var formArray = new FormArray([]);
        this.model.questions.forEach(x=> formArray.push(this.initQuestion(x)));
        this.form.addControl('questions', formArray);
        this.form.addControl('onBoardingMessage', new FormControl(this.model.onBoardingMessage, [<any>Validators.required, <any>Validators.minLength(5)]));
        this.form.addControl('successMessage', new FormControl(this.model.successMessage, [<any>Validators.required, <any>Validators.minLength(5)]));
        this.form.addControl('failMessage', new FormControl(this.model.failMessage, [<any>Validators.required, <any>Validators.minLength(5)]));       
    };

    removeFormControls() {
        this.form.removeControl('questions');
    };

    initQuestion(question: QuizClasses.QuizQuestion = new QuizClasses.QuizQuestion()) {
        var fg = this.baseQuestionForm(question);
        fg.addControl('quizFeedId', new FormControl(question.quizFeedId, []));
        return fg;
    }

    initAnswer(answer: QuizClasses.QuizQuestionAnswer = new QuizClasses.QuizQuestionAnswer()) {
        var fg = this.baseAnswerForm(answer);
        fg.addControl('quizQuestionId', new FormControl(answer.quizQuestionId, []));
        fg.addControl('isCorrect', new FormControl(answer.isCorrect, []));
        return fg;
    }
}
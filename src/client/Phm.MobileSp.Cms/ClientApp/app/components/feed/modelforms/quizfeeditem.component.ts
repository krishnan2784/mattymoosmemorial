import { Component, Injector } from '@angular/core';
import {  FormControl, FormArray, Validators } from '@angular/forms'
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import QuizClasses = require("../../../models/quizclasses");
import Basequestionfeeditemcomponent = require("./basequestionfeeditem.component");
import BaseQuestionFeedItemFormComponent = Basequestionfeeditemcomponent.BaseQuestionFeedItemFormComponent;
import { minCorrectAnswers } from "../../../classes/validators";

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
        var formArray = new FormArray([], Validators.minLength(1));
        this.model.questions.forEach(x=> formArray.push(this.initQuestion(x)));
        this.form.addControl('questions', formArray);
        this.form.addControl('onBoardingMessage', new FormControl(this.model.onBoardingMessage, []));
        this.form.addControl('successMessage', new FormControl(this.model.successMessage, [Validators.required]));
        this.form.addControl('failMessage', new FormControl(this.model.failMessage, [Validators.required]));  
        this.form.controls['mainIconId'].setValidators(null);
    };

    removeFormControls() {
        this.form.removeControl('questions');
        this.form.removeControl('onBoardingMessage');
        this.form.removeControl('successMessage');
        this.form.removeControl('failMessage');
        this.form.controls['mainIconId'].setValidators(Validators.required);
    };

    initQuestion(question: QuizClasses.QuizQuestion = new QuizClasses.QuizQuestion()) {
        question = new QuizClasses.QuizQuestion(question);
        var fg = this.baseQuestionForm(question);
        fg.addControl('quizFeedId', new FormControl(question.quizFeedId, []));
        fg.setValidators(minCorrectAnswers(1));
        fg.controls['answers'].setValidators(Validators.minLength(2));
        return fg;
    }

    initAnswer(answer: QuizClasses.QuizQuestionAnswer = new QuizClasses.QuizQuestionAnswer()) {
        answer = new QuizClasses.QuizQuestionAnswer(answer);
        var fg = this.baseAnswerForm(answer);
        fg.addControl('quizQuestionId', new FormControl(answer.quizQuestionId, []));
        fg.addControl('isCorrect', new FormControl(answer.isCorrect, []));
        return fg;
    }
}
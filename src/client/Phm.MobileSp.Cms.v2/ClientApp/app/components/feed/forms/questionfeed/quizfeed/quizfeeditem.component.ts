import { Component, Injector } from '@angular/core';
import { FormControl, FormArray, Validators } from '@angular/forms';
import {BaseQuestionFeedItemFormComponent} from "../basequestionfeeditem.component";
import {IFeedItemPartialForm} from "../../../../../contracts/components/IFeedItemComponents";
import {QuizFeed} from "../../../../../models/feedclasses";
import {QuizQuestionTypeEnum, FeedTypeEnum } from "../../../../../../enums";
import {minCorrectAnswers} from "../../../../../classes/validators";
import {QuizQuestion, QuizQuestionAnswer } from "../../../../../models/quizclasses";


@Component({
    selector: 'quizfeeditem',
    template: require('../basequestionfeeditem.component.html'),
    styles: [require('../basequestionfeeditem.component.css')]
})
export class QuizFeedItemFormComponent extends BaseQuestionFeedItemFormComponent implements IFeedItemPartialForm {
    model: QuizFeed;
    questionType: typeof QuizQuestionTypeEnum = QuizQuestionTypeEnum;
    constructor(injector: Injector) {
        super(injector, QuizFeed, FeedTypeEnum.Quiz, QuizQuestionTypeEnum);
    }

    addFormControls() {
        var formArray = new FormArray([], Validators.minLength(1));
        this.model.questions.forEach(x=> formArray.push(this.initQuestion(x)));
        this.form.addControl('questions', formArray);
        this.form.addControl('onBoardingMessage', new FormControl({ value: this.model.onBoardingMessage, disabled: true}, []));
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

    initQuestion(question: QuizQuestion = new QuizQuestion()) {
        question = new QuizQuestion(question);
        var fg = this.baseQuestionForm(question);
        fg.addControl('quizFeedId', new FormControl(question.quizFeedId, []));
        fg.setValidators(minCorrectAnswers(1));
        fg.controls['answers'].setValidators(Validators.minLength(2));
        return fg;
    }

    initAnswer(answer: QuizQuestionAnswer = new QuizQuestionAnswer()) {
        answer = new QuizQuestionAnswer(answer);
        var fg = this.baseAnswerForm(answer);
        fg.addControl('quizQuestionId', new FormControl(answer.quizQuestionId, []));
        fg.addControl('isCorrect', new FormControl(answer.isCorrect, []));
        return fg;
    }
}

import { Component, Input, Injector, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedItemForm } from "./feeditemform.component";
import { FeedDataService }  from "../../../dataservices/feeddataservice";
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import QuizClasses = require("../../../models/quizclasses");
import Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
import FeedModel = require("../../../interfaces/models/IFeedModel");
import { BasePartialItemFormComponent } from "./basepartialfeeditem.component";

declare var Materialize: any;

@Component({
    selector: 'quizfeeditem',
    template: require('./quizfeeditem.component.html'),
    styles: [require('./quizfeeditem.component.css')],
})
export class QuizFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.QuizFeed;

    answerType: typeof Enums.QuizQuestionTypeEnum = Enums.QuizQuestionTypeEnum;
    public currentQuestion:number = 0;
    constructor(injector: Injector) {
        super(injector, Feedclasses.QuizFeed, '/api/Feed/UpdateQuizFeedItem', FeedTypeEnum.Quiz);
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
        var formArray = new FormArray([]);
        question.answers.forEach(x => formArray.push(this.initAnswer(x)));

        return new FormGroup({
            id: new FormControl(question.id, []),
            quizFeedId: new FormControl(question.quizFeedId, []),
            masterId: new FormControl(question.masterId, []),
            order: new FormControl(question.order, []),
            enabled: new FormControl(question.enabled, []),
            published: new FormControl(question.published, []),
            question: new FormControl(question.question, [<any>Validators.required]),
            questionType: new FormControl(question.questionType, [<any>Validators.required]),
            answers: formArray
        });
    }

    initAnswer(answer: QuizClasses.QuizQuestionAnswer) {
        return new FormGroup({
            id: new FormControl(answer.id, []),
            quizQuestionId: new FormControl(answer.quizQuestionId, []),
            masterId: new FormControl(answer.masterId, []),
            order: new FormControl(answer.order, []),
            enabled: new FormControl(answer.enabled, []),
            published: new FormControl(answer.published, []),
            answer: new FormControl(answer.answer, [<any>Validators.required]),
            isCorrect: new FormControl( answer.isCorrect, [])
        });
    }

    addQuestion(question: QuizClasses.QuizQuestion = new QuizClasses.QuizQuestion()) {
        const control = <FormArray>this.form.controls['questions'];
        control.push(this.initQuestion(question));
        this.displayQuestion(control.length-1);
    }

    removeQuestion(index: number) {
        const questions = <FormArray>this.form.controls['questions'];
        if (this.currentQuestion > 0)
            this.displayQuestion(this.currentQuestion - 1);
        questions.removeAt(index);
    }

    displayQuestion(index: number) {
        const questions = <FormArray>this.form.controls['questions'];
        if (index < 0 || index > (questions.length - 1))
            return;
        this.currentQuestion = index;
        setTimeout(function () {
            Materialize.updateTextFields();
        }, 10);  
    }
}